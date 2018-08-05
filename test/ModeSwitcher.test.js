import ModeSwitcher, {
  Icon
} from '../src/saka/Main/Components/ModeSwitcher/index.jsx';
import { render } from 'preact-render-spy';
import { fadedColorMap } from 'lib/colors.js';
import { h } from 'preact';

describe('Icon component ', () => {
  it('should render while enabled', () => {
    const props = {
      icon: '',
      color: 'rgba(1,1,1,0.44)'
    };

    const iconRender = render(<Icon {...props} />);
    const icon = iconRender.find('#icon');

    expect(icon).toBeTruthy();
  });
});

describe('ModeSwitcher component ', () => {
  it('should render tabs with selected tab colored, rest of tabs gray', () => {
    const props = {
      mode: 'tab',
      setMode: () => {}
    };

    const modeSwitcherRender = render(<ModeSwitcher {...props} />);
    const modeSwitcher = modeSwitcherRender.find('.mode-switcher-wrapper');
    const tab = modeSwitcher
      .children()
      .at(0)
      .children();

    const bookmark = modeSwitcher
      .children()
      .at(2)
      .children();

    expect(tab.attr('icon')).toBe('tab');
    expect(tab.attr('color')).toBe(fadedColorMap.tab);

    expect(bookmark.attr('icon')).toBe('bookmark_border');
    expect(bookmark.attr('color')).toBe(fadedColorMap.unknown);
  });
});
