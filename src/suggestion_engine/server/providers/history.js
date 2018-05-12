import { isSakaUrl } from 'lib/url.js';
import { MAX_RESULTS } from './index.js';

export default async function getHistorySuggestions(searchText) {
  const results = await browser.history.search({
    text: searchText,
    maxResults: MAX_RESULTS
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
