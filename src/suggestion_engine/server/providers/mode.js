import { ctrlChar } from 'lib/utils.js';
import { colorMap, fadedColorMap } from 'lib/colors.js';
import Fuse from 'fuse.js';

export const suggestions = [
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

const fuse = new Fuse(suggestions, {
  shouldSort: true,
  threshold: 1.0,
  includeMatches: true,
  keys: ['label']
});

export default async function modeSuggestions(searchString) {
  return searchString === ''
    ? suggestions
    : fuse.search(searchString).map(({ item, matches, score }) => ({
        ...item,
        score,
        matches
      }));
}
