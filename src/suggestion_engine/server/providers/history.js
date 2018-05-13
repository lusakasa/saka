import Fuse from 'fuse.js';
import { isSakaUrl } from 'lib/url.js';
import { MAX_RESULTS } from './';

async function allHistorySuggestions(searchText) {
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

async function filteredHistorySuggestions(searchString) {
  const history = await allHistorySuggestions(searchString);
  const fuse = new Fuse(history, {
    shouldSort: true,
    threshold: 0.5,
    minMatchCharLength: 1,
    includeMatches: true,
    keys: ['title', 'url']
  });
  return fuse.search(searchString).map(({ item, matches, score }) => ({
    ...item,
    score,
    matches
  }));
}

export default async function historySuggestions(searchString) {
  return searchString === ''
    ? allHistorySuggestions(searchString)
    : filteredHistorySuggestions(searchString);
}
