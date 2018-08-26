import { h } from 'preact';
import {
  render,
  cleanup,
  wait,
  fireEvent,
  flushPromises,
  getByValue
} from 'preact-testing-library';
import 'jest-dom/extend-expect';
import MainOptions from '@/options/Main/MainOptions.jsx';

beforeEach(() => {
  browser.flush();
  browser.storage.sync.set.returns({});
});

test('should show all options when not showing key bindings', async () => {
  browser.storage.sync.get.returns({});
  const { getByText, queryByText } = render(<MainOptions />);

  getByText('Saka Options');
  await wait(() => getByText('General Settings'));
  //DefaultModeSelection
  getByText('Default Mode');
  getByText('Select the default mode Saka opens with');
  //OnlyShowSearchBarSelector
  getByText('Suggestions on load');
  getByText('Show suggestions when there is no text is the Saka search bar');
  //EnableFuzzySearch
  getByText('Enable fuzzy search');
  getByText('Enable fuzzy search for bookmarks and history search');

  expect(queryByText('Keyboard Shortcuts')).not.toBeInTheDocument();
});

test('should only show key bindings when setting is true', async () => {
  browser.storage.sync.get.returns({});
  global.SAKA_PLATFORM = 'chrome';
  const { debug, getByText, getByLabelText } = render(<MainOptions />);

  await wait(() => getByText('General Settings'));
  getByText('Saka Hotkeys');
  fireEvent.click(getByText('keyboard'), { button: 0 });
  await flushPromises();

  getByText('Saka Options');
  expect(getByText('arrow_back'));
  expect(getByLabelText('Back to Saka settings')).toMatchSnapshot();
  expect(getByLabelText('Info about Saka custom hotkeys')).toMatchSnapshot();
  getByText(
    'To modify the Saka hotkeys, please visit chrome://extensions/shortcuts'
  );
  getByText('Keyboard Shortcuts');
  getByText('Open Saka');
});

test('should save settings when save button clicked', async () => {
  browser.storage.sync.get.returns({
    sakaSettings: {}
  });
  const { getByText, getByLabelText, getByValue } = render(<MainOptions />);

  await wait(() => getByText('General Settings'));

  fireEvent.change(getByLabelText('Select default mode'), {
    target: { value: 'history' }
  });
  await flushPromises();

  fireEvent.click(getByLabelText('Suggestions on load'), { button: 0 });
  await flushPromises();

  fireEvent.click(getByLabelText('Enable fuzzy search'), { button: 0 });
  await flushPromises();

  fireEvent.click(getByValue('Save'), { button: 0 });
  await flushPromises();

  expect(browser.storage.sync.get.calledOnce);
});

afterEach(cleanup);
