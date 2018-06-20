import { getFilteredSuggestions, objectFromArray } from 'lib/utils.js';
import tabSuggestions, { allTabSuggestions } from './tab.js';
import { getAllSuggestions as getAllClosedTabs } from './closedTab.js';
import { allHistorySuggestions as getAllHistoryTabs } from './history.js';

async function allRecentlyViewedSuggestions(searchString) {
  const openTabs = await tabSuggestions(searchString);
  const closedTabs = await getAllClosedTabs(searchString);
  const historyTabs = await getAllHistoryTabs(searchString);

  const openTabsMap = objectFromArray(openTabs, 'url');
  const filteredClosedTabs = closedTabs.filter(
    tab => !openTabsMap.hasOwnProperty(tab.url)
  );

  const openAndClosedTabsMap = objectFromArray(
    [...openTabs, ...filteredClosedTabs],
    'url'
  );
  const filteredHistoryTabs = historyTabs.filter(
    tab => !openAndClosedTabsMap.hasOwnProperty(tab.url)
  );

  return [...openTabs, ...filteredClosedTabs, ...filteredHistoryTabs].map(
    tab => ({ ...tab, originalType: tab.type, type: 'recentlyViewed' })
  );
}

function compareRecentlyViewedSuggestions(suggestion1, suggestion2) {
  return suggestion2.lastAccessed - suggestion1.lastAccessed;
}

async function filteredRecentlyViewedSuggestions(searchString) {
  const tabs = await allTabSuggestions();
  const closedTabs = await getAllClosedTabs(searchString);
  const historyTabs = await getAllHistoryTabs(searchString);

  return [
    ...tabs,
    ...Object.values(closedTabs),
    ...Object.values(historyTabs)
  ].map(tab => ({ ...tab, originalType: tab.type, type: 'recentlyViewed' }));
}

export default async function recentlyViewedSuggestions(searchString) {
  if (searchString === '') {
    const suggestions = await allRecentlyViewedSuggestions(searchString);
    return suggestions.sort(compareRecentlyViewedSuggestions);
  }

  return getFilteredSuggestions(searchString, {
    getSuggestions: filteredRecentlyViewedSuggestions,
    threshold: 0.5,
    keys: ['title', 'url']
  });
}
