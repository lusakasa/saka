import { ctrlChar } from 'lib/utils';
import { colorMap, fadedColorMap } from 'lib/colors';
import Fuse from 'fuse.js';

const suggestions = [
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
  // {
  //   type: 'mode',
  //   label: 'History',
  //   mode: 'history',
  //   shortcut: `${ctrlChar}-shift-H`,
  //   color: colorMap.history,
  //   fadedColor: fadedColorMap.history,
  //   icon: 'history'
  // },
  // {
  //   type: 'mode',
  //   label: 'Bookmarks',
  //   mode: 'bookmark',
  //   shortcut: `${ctrlChar}-shift-B`,
  //   color: colorMap.bookmark,
  //   fadedColor: fadedColorMap.bookmark,
  //   icon: 'bookmark_border'
  // }
];

const fuse = new Fuse(suggestions, {
  shouldSort: true,
  threshold: 1.0,
  includeMatches: true,
  keys: ['label']
});

export async function modeSuggestions (searchString) {
  return (searchString === '')
    ? suggestions
    : fuse.search(searchString)
      .map(({
        item,
        matches,
        score
      }) => ({
        ...item,
        score,
        matches
      }));
}
