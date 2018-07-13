import modeSuggestions from 'suggestion_engine/server/providers/mode.js';
import { ctrlChar } from 'lib/utils';
import { colorMap, fadedColorMap } from 'lib/colors';

describe('server/providers/mode ', () => {
  describe('modeSuggestions ', () => {
    it('should return all modes when no search string provided', async () => {
      const expectedResult = [
        {
          type: 'mode',
          mode: 'tab',
          label: 'Tabs',
          shortcut: `${ctrlChar}-shift-a`,
          color: colorMap.tab,
          fadedColor: fadedColorMap.tab,
          icon: 'tab'
        },
        {
          type: 'mode',
          mode: 'closedTab',
          label: 'Recently Closed Tabs',
          shortcut: `${ctrlChar}-shift-c`,
          color: colorMap.closedTab,
          fadedColor: fadedColorMap.closedTab,
          icon: 'restore_page'
        },
        {
          type: 'mode',
          label: 'Bookmarks',
          mode: 'bookmark',
          shortcut: `${ctrlChar}-b`,
          color: colorMap.bookmark,
          fadedColor: fadedColorMap.bookmark,
          icon: 'bookmark_border'
        },
        {
          type: 'mode',
          label: 'History',
          mode: 'history',
          shortcut: `${ctrlChar}-shift-e`,
          color: colorMap.history,
          fadedColor: fadedColorMap.history,
          icon: 'history'
        },
        {
          type: 'mode',
          label: 'Recently Viewed',
          mode: 'recentlyViewed',
          shortcut: `${ctrlChar}-shift-x`,
          color: colorMap.recentlyViewed,
          fadedColor: fadedColorMap.recentlyViewed,
          icon: 'timelapse'
        }
      ];

      const searchString = '';
      expect(await modeSuggestions(searchString)).toEqual(expectedResult);
    });

    it('should return closedTab search mode when search string `cl` provided', async () => {
      const expectedResult = [
        {
          type: 'mode',
          mode: 'closedTab',
          label: 'Recently Closed Tabs',
          shortcut: `${ctrlChar}-shift-c`,
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
        },
        {
          type: 'mode',
          label: 'Recently Viewed',
          mode: 'recentlyViewed',
          shortcut: `${ctrlChar}-shift-x`,
          color: 'rgba(152,78,163,1)',
          fadedColor: 'rgba(152,78,163,0.44)',
          icon: 'timelapse',
          score: undefined,
          matches: [
            {
              indices: [[2, 2], [6, 6]],
              value: 'Recently Viewed',
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
