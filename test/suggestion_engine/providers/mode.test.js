import modeSuggestions from 'suggestion_engine/server/providers/mode.js';
import { ctrlChar } from 'lib/utils';
import { colorMap, fadedColorMap } from 'lib/colors';

describe('server/providers/mode ', function() {
  describe('modeSuggestions ', function() {
    it('should return all modes when no search string provided', async function() {
      const expectedResult = [
        {
          type: 'mode',
          mode: 'tab',
          label: 'Tabs',
          shortcut: `${ctrlChar}-shift-A`,
          color: colorMap.tab,
          fadedColor: fadedColorMap.tab,
          icon: 'tab'
        },
        {
          type: 'mode',
          mode: 'closedTab',
          label: 'Recently Closed Tabs',
          shortcut: `${ctrlChar}-shift-C`,
          color: colorMap.closedTab,
          fadedColor: fadedColorMap.closedTab,
          icon: 'restore_page'
        },
        {
          type: 'mode',
          label: 'Bookmarks',
          mode: 'bookmark',
          shortcut: `${ctrlChar}-B`,
          color: colorMap.bookmark,
          fadedColor: fadedColorMap.bookmark,
          icon: 'bookmark_border'
        }
      ];

      const searchString = '';
      expect(await modeSuggestions(searchString)).toEqual(expectedResult);
    });

    it('should return closedTab search mode when search string `cl` provided', async function() {
      const expectedResult = [
        {
          type: 'mode',
          mode: 'closedTab',
          label: 'Recently Closed Tabs',
          shortcut: 'ctrl-shift-C',
          color: 'rgba(0,0,0,1)',
          fadedColor: 'rgba(0,0,0,0.44)',
          icon: 'restore_page',
          score: undefined,
          matches: [
            {
              indices: [[2, 2], [6, 6], [9, 10]],
              value: 'Recently Closed Tabs',
              key: 'label',
              arrayIndex: 0
            }
          ]
        }
      ];

      const searchString = 'cl';
      expect(await modeSuggestions(searchString)).toEqual(expectedResult);
    });
  });
});
