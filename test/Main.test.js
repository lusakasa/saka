import { h } from 'preact';
import {
  render,
  cleanup,
  wait,
  fireEvent,
  flushPromises
} from 'preact-testing-library';
import 'jest-dom/extend-expect';
import Main from '@/saka/Main/index.jsx';

beforeEach(() => {
  browser.flush();
  // browser.storage.sync.get.returns({
  //   sakaSettings: {
  //     mode: 'tab',
  //     showEmptySearchSuggestions: false
  //   },
  //   searchHistory: []
  // });
  browser.storage.local.get.resolves(
    Promise.resolve({
      screenshot:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAB4AAAAPWCAYAAAABOoU/AAAgAElEQVR4nOzdeXzbd2H/8e9XcqDOXdrC2OAH/W1l49rooMAgvQsbg0F}'
    })
  );
  browser.storage.local.remove.returns('');
  browser.runtime.sendMessage.returns('');
});

test('should show all options when not showing key bindings', async () => {
  render(<Main />);
});

afterEach(cleanup);
