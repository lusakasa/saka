import ModeSwitcher from '@/saka/Main/Components/ModeSwitcher/index.jsx';
import { render } from 'preact-testing-library';
import { h } from 'preact';

describe('ModeSwitcher component ', () => {
  it('should render tabs with selected tab colored, rest of tabs gray', () => {
    const props = {
      mode: 'tab',
      setMode: () => {}
    };

    const { getByText } = render(<ModeSwitcher {...props} />);

    getByText('tab');
    getByText('restore_page');
    getByText('bookmark_border');
    getByText('history');
    getByText('timelapse');
  });
});
