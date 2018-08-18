import ModeSwitcher from '@/saka/Main/Components/ModeSwitcher/index.jsx';
import { render, cleanup } from 'preact-testing-library';
import { fadedColorMap } from 'lib/colors.js';
import { h } from 'preact';

afterEach(cleanup);

describe('ModeSwitcher component ', () => {
  it('should render tabs with selected tab colored, rest of tabs gray', async () => {
    const props = {
      mode: 'tab',
      setMode: () => {}
    };

    const { getByText } = render(<ModeSwitcher {...props} />);

    expect(getByText('tab')).toMatchSnapshot();
    expect(getByText('restore_page')).toMatchSnapshot();
    expect(getByText('bookmark_border')).toMatchSnapshot();
    expect(getByText('history')).toMatchSnapshot();
    expect(getByText('timelapse')).toMatchSnapshot();
  });
});
