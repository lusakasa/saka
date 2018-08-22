import { h } from 'preact';
import {
  render,
  cleanup,
  flushPromises,
  fireEvent
} from 'preact-testing-library';

import OptionsPage from '@/options/Main/MainOptions.jsx';

beforeEach(() => {
  browser.flush();
  browser.storage.sync.get.returns({});
});

test('should not', async () => {
  const props = {
    showSakaKeybindings: false
  };

  const { debug, getByText } = render(<OptionsPage {...props} />);
  await flushPromises();

  getByText('Saka Options');
});

afterEach(cleanup);
