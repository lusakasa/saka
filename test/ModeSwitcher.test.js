import ModeSwitcher from '../src/saka/Main/Components/ModeSwitcher/index.jsx';
import { render } from 'preact-render-spy';
import { fadedColorMap } from 'lib/colors.js';
import { h } from 'preact';

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

    const recentClosed = modeSwitcher
      .children()
      .at(1)
      .children();

    const bookmark = modeSwitcher
      .children()
      .at(2)
      .children();

    const history = modeSwitcher
      .children()
      .at(3)
      .children();

    const recentlyViewed = modeSwitcher
      .children()
      .at(4)
      .children();

    expect(tab.attr('icon')).toBe('tab');
    expect(tab.attr('color')).toBe(fadedColorMap.tab);

    expect(recentClosed.attr('icon')).toBe('restore_page');
    expect(recentClosed.attr('color')).toBe(fadedColorMap.unknown);

    expect(bookmark.attr('icon')).toBe('bookmark_border');
    expect(bookmark.attr('color')).toBe(fadedColorMap.unknown);

    expect(history.attr('icon')).toBe('history');
    expect(history.attr('color')).toBe(fadedColorMap.unknown);

    expect(recentlyViewed.attr('icon')).toBe('timelapse');
    expect(recentlyViewed.attr('color')).toBe(fadedColorMap.unknown);
  });
});
