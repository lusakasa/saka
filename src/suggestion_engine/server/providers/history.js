import { isSakaUrl } from 'lib/url.js';
import { getFilteredSuggestions } from 'lib/utils.js';

export async function allHistorySuggestions(searchText) {
  const results = await browser.history.search({
    text: searchText
  });

  const filteredResults = [];

  for (const result of results) {
    const sakaUrl = await isSakaUrl(result.url);
    !sakaUrl ? filteredResults.push(result) : null;
  }

  return filteredResults.map(
    ({ url, title, lastVisitTime, visitCount, typedCount }) => ({
      type: 'history',
      score: visitCount + typedCount,
      lastAccessed: lastVisitTime,
      title,
      url
    })
  );
}

export default async function historySuggestions(searchString) {
  const { sakaSettings } = await browser.storage.sync.get(['sakaSettings']);

  if (searchString && sakaSettings.enableFuzzySearch) {
    return getFilteredSuggestions(searchString, {
      getSuggestions: allHistorySuggestions,
      threshold: 1,
      keys: ['title', 'url']
    });
  }

  return allHistorySuggestions(searchString);
}
