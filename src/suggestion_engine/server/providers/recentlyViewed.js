import { getFilteredSuggestions, objectFromArray } from 'lib/utils.js';
import { allTabSuggestions as getAllOpenTabs } from './tab.js';
import { getAllSuggestions as getAllClosedTabs } from './closedTab.js';

async function allRecentlyViewedSuggestions(searchString) {
  const openTabs = await getAllOpenTabs(searchString);
  const closedTabs = await getAllClosedTabs(searchString);

  const closedTabsMap = objectFromArray(closedTabs, 'url');
  const recentOpenTabs = openTabs.map(openTab => {
    if (closedTabsMap[openTab.url]) {
      delete closedTabsMap[openTab.url];
    }
    return openTab;
  });

  console.warn('ASD: ', [...recentOpenTabs, ...Object.values(closedTabsMap)]);
  return [...recentOpenTabs, ...Object.values(closedTabsMap)];
}

function compareRecentlyViewedSuggestions(suggestion1, suggestion2) {
  return suggestion2.lastAccessed - suggestion1.lastAccessed;
}

export default async function recentlyViewedSuggestions(searchString) {
  const { sakaSettings } = await browser.storage.sync.get(['sakaSettings']);

  // if (sakaSettings.enableFuzzySearch) {
  //   return getFilteredSuggestions(searchString, {
  //     getSuggestions: allRecentlyViewedSuggestions,
  //     threshold: 1,
  //     keys: ['lastAccessed']
  //   });
  // }

  const suggestions = await allRecentlyViewedSuggestions(searchString);
  const sorted = suggestions.sort(compareRecentlyViewedSuggestions);
  console.error('Sorted: ', sorted);

  return sorted;
}
