import { h } from 'preact';
import {
  render,
  cleanup,
  flushPromises,
  fireEvent
} from 'preact-testing-library';

import StandardSearch from '@/saka/Main/Containers/StandardSearch/index.jsx';

beforeEach(() => {
  browser.flush();
  browser.storage.local.get.resolves(
    Promise.resolve({
      screenshot:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAB4AAAAPWCAYAAAABOoU/AAAgAElEQVR4nOzdeXzbd2H/8e9XcqDOXdrC2OAH/W1l49rooMAgvQsbg0F}'
    })
  );
  browser.storage.local.remove.returns('');
  browser.runtime.sendMessage.returns('');
});

test('should not show suggestion list when showEmptySearchSuggestions false and no search string', () => {
  const props = {
    placeholder: 'Tabs',
    mode: 'tab',
    showEmptySearchSuggestions: false,
    searchHistory: ['first', 'second', 'third'],
    updateSearchHistory: jest.fn()
  };

  const { getByPlaceholderText } = render(<StandardSearch {...props} />);
  expect(getByPlaceholderText('Tabs').value).toBe('');
});

test('should render and allow user input to search for suggestion', () => {
  const props = {
    placeholder: 'Tabs',
    mode: 'tab',
    showEmptySearchSuggestions: true,
    searchHistory: [],
    updateSearchHistory: jest.fn(),
    shuffleMode: jest.fn()
  };

  const { getByPlaceholderText } = render(<StandardSearch {...props} />);

  getByPlaceholderText('Tabs').value = 'Test input';
  fireEvent.input(getByPlaceholderText('Tabs'));
  expect(getByPlaceholderText('Tabs').value).toBe('Test input');

  fireEvent.keyDown(getByPlaceholderText('Tabs'), {
    key: ' ',
    shiftKey: true
  });
  expect(props.shuffleMode.mock.calls.length).toBe(1);

  fireEvent.keyDown(getByPlaceholderText('Tabs'), {
    key: 'k',
    keyCode: 75,
    which: 75,
    ctrlKey: true
  });
});

test('should allow keyboard navigation of Saka search results', () => {
  const props = {
    placeholder: 'Tabs',
    mode: 'tab',
    showEmptySearchSuggestions: true,
    searchHistory: [],
    updateSearchHistory: jest.fn()
  };

  const { getByPlaceholderText } = render(<StandardSearch {...props} />);

  fireEvent.keyDown(getByPlaceholderText('Tabs'), {
    key: 'Tab'
  });

  fireEvent.keyDown(getByPlaceholderText('Tabs'), {
    key: 'Tab',
    keyCode: 9,
    which: 9,
    shiftKey: true
  });

  fireEvent.keyDown(getByPlaceholderText('Tabs'), {
    key: 'd',
    keyCode: 68,
    which: 68,
    shiftKey: true,
    ctrlKey: true
  });

  fireEvent.keyDown(getByPlaceholderText('Tabs'), {
    key: 's',
    keyCode: 83,
    which: 83,
    shiftKey: true,
    ctrlKey: true
  });
});

test('should allow going back and forward through search history', () => {
  const props = {
    placeholder: 'Tabs',
    mode: 'tab',
    showEmptySearchSuggestions: true,
    searchHistory: ['first', 'second', 'third'],
    updateSearchHistory: jest.fn()
  };

  const { getByPlaceholderText } = render(<StandardSearch {...props} />);
  fireEvent.keyDown(getByPlaceholderText('Tabs'), {
    key: 'z',
    keyCode: 90,
    which: 90,
    ctrlKey: true
  });

  fireEvent.keyDown(getByPlaceholderText('Tabs'), {
    key: 'y',
    keyCode: 89,
    which: 89,
    ctrlKey: true
  });
});

test('should allow switching between search modes', async () => {
  const props = {
    placeholder: 'Tabs',
    mode: 'tab',
    showEmptySearchSuggestions: true,
    searchHistory: ['first', 'second', 'third'],
    updateSearchHistory: jest.fn(),
    shuffleMode: jest.fn(),
    setMode: jest.fn()
  };

  const { getByPlaceholderText } = render(<StandardSearch {...props} />);

  fireEvent.keyDown(getByPlaceholderText('Tabs'), {
    key: ' '
  });
  expect(props.shuffleMode.mock.calls.length).toBe(1);

  // Recently Closed
  fireEvent.keyDown(getByPlaceholderText('Tabs'), {
    key: 'C',
    ctrlKey: true
  });

  // Tabs
  fireEvent.keyDown(getByPlaceholderText('Tabs'), {
    key: 'A',
    ctrlKey: true
  });

  // Bookmarks
  fireEvent.keyDown(getByPlaceholderText('Tabs'), {
    key: 'b',
    ctrlKey: true
  });

  // History
  fireEvent.keyDown(getByPlaceholderText('Tabs'), {
    key: 'E',
    ctrlKey: true
  });

  // Recently Viewed
  fireEvent.keyDown(getByPlaceholderText('Tabs'), {
    key: 'X',
    ctrlKey: true
  });

  // Modes
  // TODO: Deprecate this feature
  fireEvent.keyDown(getByPlaceholderText('Tabs'), {
    key: 'M',
    ctrlKey: true
  });

  expect(props.setMode.mock.calls.length).toBe(6);
});

test('should close saka on Enter key', () => {
  const props = {
    placeholder: 'Tabs',
    mode: 'tab',
    showEmptySearchSuggestions: true,
    searchHistory: [],
    updateSearchHistory: jest.fn(),
    shuffleMode: jest.fn()
  };

  const { getByPlaceholderText } = render(<StandardSearch {...props} />);

  fireEvent.keyDown(getByPlaceholderText('Tabs'), {
    key: 'Enter'
  });

  fireEvent.keyDown(getByPlaceholderText('Tabs'), {
    key: 'Backspace'
  });

  fireEvent.keyDown(getByPlaceholderText('Tabs'), {
    key: 'Escape'
  });
});

test('should allow navigation via arrow keys', () => {
  const props = {
    placeholder: 'Tabs',
    mode: 'tab',
    showEmptySearchSuggestions: true,
    searchHistory: [],
    updateSearchHistory: jest.fn(),
    shuffleMode: jest.fn()
  };

  const { getByPlaceholderText } = render(<StandardSearch {...props} />);

  fireEvent.keyDown(getByPlaceholderText('Tabs'), {
    key: 'ArrowLeft'
  });

  fireEvent.keyDown(getByPlaceholderText('Tabs'), {
    key: 'ArrowRight'
  });

  fireEvent.keyDown(getByPlaceholderText('Tabs'), {
    key: 'ArrowDown'
  });

  fireEvent.keyDown(getByPlaceholderText('Tabs'), {
    key: 'ArrowUp'
  });
});

test('should select suggestion based on key press', () => {
  const props = {
    placeholder: 'Tabs',
    mode: 'tab',
    showEmptySearchSuggestions: true,
    searchHistory: [],
    updateSearchHistory: jest.fn(),
    shuffleMode: jest.fn()
  };

  const { getByPlaceholderText } = render(<StandardSearch {...props} />);

  [1, 2, 3, 4, 5, 6].map(num => {
    fireEvent.keyDown(getByPlaceholderText('Tabs'), {
      key: `${num}`,
      ctrlKey: true
    });
  });
});

afterEach(cleanup);
