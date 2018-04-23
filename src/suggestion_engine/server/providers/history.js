import { isSakaUrl } from 'lib/url.js';
import { MAX_RESULTS } from './';

export default async function historySuggestions(searchText) {
  const results = await browser.history.search({
    text: searchText,
    maxResults: MAX_RESULTS
  });

  return results
    .filter(result => !isSakaUrl(result.url))
    .map(({ url, title, lastVisitTime, visitCount, typedCount }) => ({
      type: 'history',
      score: visitCount + typedCount,
      lastVisitTime,
      title,
      url
    }));
}
