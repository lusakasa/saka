import { isSakaUrl } from 'lib/url.js';
import { getFilteredSuggestions } from 'lib/utils.js';

async function allHistorySuggestions(searchText) {
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
      lastVisitTime,
      title,
      url
    })
  );
}

export default async function historySuggestions(searchString) {
  const { sakaSettings } = await browser.storage.sync.get(['sakaSettings']);
  const enableFuzzySearch = sakaSettings
    ? sakaSettings.enableFuzzySearch
    : true;
  if (searchString && enableFuzzySearch) {
    return getFilteredSuggestions(searchString, allHistorySuggestions, 1);
  }

  return allHistorySuggestions(searchString);
}
