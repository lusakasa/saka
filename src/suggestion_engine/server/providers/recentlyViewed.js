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

  console.warn('Recent: ', [
    ...openTabs,
    ...filteredClosedTabs,
    ...filteredHistoryTabs
  ]);
  return [...openTabs, ...filteredClosedTabs, ...filteredHistoryTabs];
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
    console.warn(
      'Sorted: ',
      suggestions.sort(compareRecentlyViewedSuggestions)
    );
    return suggestions.sort(compareRecentlyViewedSuggestions);
  }

  return getFilteredSuggestions(searchString, {
    getSuggestions: filteredRecentlyViewedSuggestions,
    threshold: 0.5,
    keys: ['title', 'url']
  });
}
