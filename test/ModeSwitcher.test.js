import ModeSwitcher from '@/saka/Main/Components/ModeSwitcher/index.jsx';
import {
  render,
  cleanup,
  fireEvent,
  flushPromises
} from 'preact-testing-library';
import { fadedColorMap } from 'lib/colors.js';
import { h } from 'preact';

describe('ModeSwitcher component ', () => {
  it('should render tabs with selected tab colored, rest of tabs gray', async () => {
    const setMode = jest.fn();

    const props = {
      mode: 'tab',
      setMode
    };

    const { getByText } = render(<ModeSwitcher {...props} />);

    expect(getByText('tab')).toMatchSnapshot();
    expect(getByText('restore_page')).toMatchSnapshot();
    expect(getByText('bookmark_border')).toMatchSnapshot();
    expect(getByText('history')).toMatchSnapshot();
    expect(getByText('timelapse')).toMatchSnapshot();

    fireEvent.click(getByText('restore_page'), 'click');
    await flushPromises();
    expect(setMode.mock.calls.length).toBe(1);
  });
});

afterEach(cleanup);
