import { getFilteredSuggestions, objectFromArray } from 'lib/utils.js';
import tabSuggestions, { allTabSuggestions } from './tab.js';
import { getAllSuggestions as getAllClosedTabs } from './closedTab.js';

async function allRecentlyViewedSuggestions(searchString) {
  console.warn('allRecentlyViewedSuggestions starting...');
  const openTabs = await tabSuggestions(searchString);
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

async function filteredRecentlyViewedSuggestions(searchString) {
  const tabs = await allTabSuggestions();
  const closedTabs = await getAllClosedTabs(searchString);

  return [...tabs, ...Object.values(closedTabs)];
}

export default async function recentlyViewedSuggestions(searchString) {
  const suggestions = await allRecentlyViewedSuggestions(searchString);

  if (searchString !== undefined) {
    return suggestions.sort(compareRecentlyViewedSuggestions);
  }

  return getFilteredSuggestions(searchString, {
    getSuggestions: filteredRecentlyViewedSuggestions,
    threshold: 0.5,
    keys: ['title', 'url']
  });
}
