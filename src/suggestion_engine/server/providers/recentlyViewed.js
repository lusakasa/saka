import { getFilteredSuggestions } from 'lib/utils.js';
import tabSuggestions, {
  allTabSuggestions,
  recentVisitedTabSuggestions
} from './tab.js';
import {
  getAllSuggestions as getAllClosedTabs,
  recentlyClosedTabSuggestions
} from './closedTab.js';
import { allHistorySuggestions as getAllHistoryTabs } from './history.js';

function compareRecentlyViewedSuggestions(suggestion1, suggestion2) {
  return suggestion2.lastAccessed - suggestion1.lastAccessed;
}

async function allRecentlyViewedSuggestions(searchString) {
  const historyTabs = await getAllHistoryTabs(searchString);
  let openTabs = null;
  let closedTabs = null;

  if (SAKA_PLATFORM === 'chrome') {
    openTabs = await recentVisitedTabSuggestions(searchString);
    closedTabs = await recentlyClosedTabSuggestions(searchString);
  } else {
    openTabs = await tabSuggestions(searchString);
    closedTabs = await getAllClosedTabs(searchString);
  }

  const filteredClosedTabs = closedTabs.filter(tab =>
    openTabs.every(openTab => openTab.url !== tab.url)
  );

  const filteredHistoryTabs = historyTabs.filter(tab =>
    [...openTabs, ...filteredClosedTabs].every(
      openOrClosedTab => openOrClosedTab.url !== tab.url
    )
  );

  return [...openTabs, ...filteredClosedTabs, ...filteredHistoryTabs]
    .map(tab => ({ ...tab, originalType: tab.type, type: 'recentlyViewed' }))
    .sort(compareRecentlyViewedSuggestions);
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

async function getFilteredRecentlyViewedSuggestions(searchString) {
  const filteredSuggestions = await getFilteredSuggestions(searchString, {
    getSuggestions: filteredRecentlyViewedSuggestions,
    threshold: 0.5,
    keys: ['title', 'url']
  });

  return filteredSuggestions.filter(
    (suggestion, index) =>
      filteredSuggestions.findIndex(
        filteredSuggestion =>
          filteredSuggestion.url === suggestion.url &&
          filteredSuggestion.title === suggestion.title
      ) === index
  );
}

export default async function recentlyViewedSuggestions(searchString) {
  if (searchString === '') {
    return allRecentlyViewedSuggestions(searchString, SAKA_PLATFORM);
  }

  return getFilteredRecentlyViewedSuggestions(searchString);
}
