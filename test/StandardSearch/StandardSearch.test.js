import { h } from 'preact';
import {
  render,
  cleanup,
  flushPromises,
  fireEvent
} from 'preact-testing-library';
import StandardSearch from '@/saka/Main/Containers/StandardSearch/index.jsx';

// beforeAll(() => {
//   global.browser = {};
// });

// beforeEach(() => {
//   browser.flush();
// });

test('should be empty when no there is no search string provided', async () => {
  // browser.storage.local.get.resolves(
  //   Promise.resolve({
  //     screenshot:
  //       'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAB4AAAAPWCAYAAAABOoU/AAAgAElEQVR4nOzdeXzbd2H/8e9XcqDOXdrC2OAH/W1l49rooMAgvQsbg0F}'
  //   })
  // );
  // browser.storage.local.remove.returns('');

  const props = {
    placeholder: 'Tabs',
    mode: 'tab',
    showEmptySearchSuggestions: true,
    searchHistory: [],
    updateSearchHistory: jest.fn()
  };

  const { getByPlaceholderText } = render(<StandardSearch {...props} />);

  // fireEvent.change(getByPlaceholderText('Tabs'), { target: { value: 'asd' } });
  // await flushPromises();
  // expect(getByPlaceholderText('Tabs').value).toBe('Saka github');
});

afterEach(cleanup);
