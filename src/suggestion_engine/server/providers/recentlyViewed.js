import { getFilteredSuggestions, objectFromArray } from 'lib/utils.js';
import tabSuggestions from './tab.js';
import closedTabSuggestions from './closedTab.js';

async function allRecentlyViewedSuggestions(searchString) {
  const tabs = await tabSuggestions(searchString);
  const closedTabs = await closedTabSuggestions(searchString);
  console.warn('Tabs: ', tabs);
  console.warn('Closed Tabs: ', closedTabs);

  const recentlyViewed = new Set(tabs);
  closedTabs.forEach(tab => {
    recentlyViewed.add(tab);
  });

  console.warn('Recent: ', recentlyViewed);

  return recentlyViewed;
}

export default async function recentlyViewedSuggestions(searchString) {
  //   const { sakaSettings } = await browser.storage.sync.get(['sakaSettings']);

  //   if (searchString && sakaSettings.enableFuzzySearch) {
  //     return getFilteredSuggestions(
  //       searchString,
  //       allRecentlyViewedSuggestions,
  //       1
  //     );
  //   }

  return allRecentlyViewedSuggestions(searchString);
}
