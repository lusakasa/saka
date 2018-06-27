import { getFilteredSuggestions } from 'lib/utils.js';
import tabSuggestions, { allTabSuggestions } from './tab.js';
import { getAllSuggestions as getAllClosedTabs } from './closedTab.js';
import { allHistorySuggestions as getAllHistoryTabs } from './history.js';

function compareRecentlyViewedSuggestions(suggestion1, suggestion2) {
  return suggestion2.lastAccessed - suggestion1.lastAccessed;
}

async function getChromeRecentlyViewed(searchString) {
  const openTabs = await tabSuggestions(searchString);
  const closedTabs = await getAllClosedTabs(searchString);
  const historyTabs = await getAllHistoryTabs(searchString);

  const filteredClosedTabs = closedTabs.filter(tab =>
    openTabs.every(openTab => openTab.url !== tab.url)
  );

  const filteredHistoryTabs = historyTabs.filter(tab =>
    [...openTabs, ...filteredClosedTabs].every(
      openOrClosedTab => openOrClosedTab.url !== tab.url
    )
  );

  const sortedClosedAndHistoryTabs = [
    ...filteredClosedTabs,
    ...filteredHistoryTabs
  ].sort(compareRecentlyViewedSuggestions);

  return [...openTabs, ...sortedClosedAndHistoryTabs].map(tab => ({
    ...tab,
    originalType: tab.type,
    type: 'recentlyViewed'
  }));
}

async function getFirefoxRecentlyViewed(searchString) {
  const openTabs = await tabSuggestions(searchString);
  const closedTabs = await getAllClosedTabs(searchString);
  const historyTabs = await getAllHistoryTabs(searchString);

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

async function allRecentlyViewedSuggestions(searchString) {
  if (SAKA_PLATFORM === 'chrome') {
    return getChromeRecentlyViewed(searchString);
  }

  return getFirefoxRecentlyViewed(searchString);
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
