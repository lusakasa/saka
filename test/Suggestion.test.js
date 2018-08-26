import { h } from 'preact';
import {
  render,
  cleanup,
  fireEvent,
  flushPromises
} from 'preact-testing-library';
import Suggestion from '@/saka/Main/Components/SuggestionList/Components/Suggestion';

test('should render when props passed in', async () => {
  global.SAKA_PLATFORM = 'chrome';

  const props = {
    type: 'tab',
    title: 'Test Title',
    titleColor: 'fafafa',
    secondary: 'Secondary Test Title',
    secondaryColor: 'ffffff',
    url: 'https://example.com',
    favIconUrl: 'localhost:1234/path/to/icon',
    incognito: false,
    selected: 'false',
    index: 0,
    onClick: () => {}
  };

  const { getByText } = render(<Suggestion {...props} />);

  getByText('Test Title');
  getByText('Secondary Test Title');
  getByText('tab');
});

test('should call onClick when onClick or onKeyPress event', async () => {
  global.SAKA_PLATFORM = 'chrome';

  const onClick = jest.fn();
  const props = {
    type: 'tab',
    title: 'Test Title',
    titleColor: 'fafafa',
    secondary: 'Secondary Test Title',
    secondaryColor: 'ffffff',
    url: 'https://example.com',
    favIconUrl: 'localhost:1234/path/to/icon',
    incognito: false,
    selected: 'false',
    index: 0,
    onClick
  };

  const { getByText } = render(<Suggestion {...props} />);

  fireEvent.click(getByText('Test Title'));
  fireEvent.keyPress(getByText('Test Title'));
  await flushPromises();
  expect(onClick.mock.calls.length).toBe(2);
});

test('should hide icon when suggestion is from incognito', () => {
  global.SAKA_PLATFORM = 'chrome';

  const onClick = jest.fn();
  const props = {
    type: 'tab',
    title: 'Test Title',
    titleColor: 'fafafa',
    secondary: 'Secondary Test Title',
    secondaryColor: 'ffffff',
    url: 'https://example.com',
    favIconUrl: 'localhost:1234/path/to/icon',
    incognito: true,
    selected: 'false',
    index: 0,
    onClick
  };

  const { getByText } = render(<Suggestion {...props} />);
});

test('should use correct favicon path when using firefox', () => {
  global.SAKA_PLATFORM = 'firefox';

  const onClick = jest.fn();
  const props = {
    type: 'tab',
    title: 'Test Title',
    titleColor: 'fafafa',
    secondary: 'Secondary Test Title',
    secondaryColor: 'ffffff',
    url: 'https://example.com',
    favIconUrl: 'localhost:1234/path/to/icon',
    incognito: false,
    selected: 'false',
    index: 0,
    onClick
  };

  const { getByText } = render(<Suggestion {...props} />);
  expect(getByText('tab')).toMatchSnapshot();
});

test('should use default favicon when no url to favicon', () => {
  global.SAKA_PLATFORM = 'firefox';

  const onClick = jest.fn();
  const props = {
    type: 'tab',
    title: 'Test Title',
    titleColor: 'fafafa',
    secondary: 'Secondary Test Title',
    secondaryColor: 'ffffff',
    incognito: false,
    selected: 'false',
    index: 0,
    onClick
  };

  const { getByText } = render(<Suggestion {...props} />);
  expect(getByText('tab')).toMatchSnapshot();
});
afterEach(cleanup);
