import { getFilteredSuggestions, objectFromArray } from 'lib/utils.js';
import tabSuggestions, { allTabSuggestions } from './tab.js';
import { getAllSuggestions as getAllClosedTabs } from './closedTab.js';
import { allHistorySuggestions as getAllHistoryTabs } from './history.js';

async function allRecentlyViewedSuggestions(searchString) {
  const openTabs = await tabSuggestions(searchString);
  const closedTabs = await getAllClosedTabs(searchString);
  const historyTabs = await getAllHistoryTabs(searchString);

  // const closedTabsMap = objectFromArray(closedTabs, 'url');
  // const historyTabsMap = objectFromArray(historyTabs, 'url');

  // const recentOpenTabs = openTabs.map(openTab => {
  //   if (closedTabsMap[openTab.url]) {
  //     delete closedTabsMap[openTab.url];
  //   }
  //   return openTab;
  // });

  // return [...recentOpenTabs, ...Object.values(closedTabsMap)];

  console.error('Tabs: ', openTabs);
  console.error('Closed: ', closedTabs);
  console.error('History: ', historyTabs);

  const filteredClosedTabs = closedTabs.filter(
    tab => openTabs.indexOf(tab.url) === -1
  );

  const openAndClosedTabs = [...openTabs, ...filteredClosedTabs];
  const filteredHistoryTabs = historyTabs.filter(
    tab => openAndClosedTabs.indexOf(tab.url) === -1
  );

  console.warn('Recent: ', [...openAndClosedTabs, ...filteredHistoryTabs]);
  return [...openAndClosedTabs, ...filteredHistoryTabs];
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
