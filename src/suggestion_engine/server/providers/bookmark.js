import { isURL, extractProtocol, isProtocol } from 'lib/url.js';
import { getFilteredSuggestions } from 'lib/utils.js';

// https://github.com/nwjs/chromium.src/blob/45886148c94c59f45f14a9dc7b9a60624cfa626a/components/omnibox/browser/bookmark_provider.cc
async function allBookmarkSuggestions(searchText) {
  const searchCriteria = searchText === '' ? {} : searchText;
  const searchResults = await browser.bookmarks.search(searchCriteria);

  const validResults = [];
  searchResults.forEach(({ url, title }) => {
    const protocol = extractProtocol(url);
    if (isURL(url) && isProtocol(protocol)) {
      validResults.push({
        type: 'bookmark',
        score: -1,
        title,
        url
      });
    }
  });

  return validResults;
}

export default async function bookmarkSuggestions(searchString) {
  const { sakaSettings } = await browser.storage.sync.get(['sakaSettings']);

  const enableFuzzySearch =
    sakaSettings && sakaSettings.enableFuzzySearch !== undefined
      ? sakaSettings.enableFuzzySearch
      : true;

  if (searchString && enableFuzzySearch) {
    return getFilteredSuggestions(searchString, {
      getSuggestions: allBookmarkSuggestions,
      threshold: 1,
      keys: ['title', 'url']
    });
  }

  return allBookmarkSuggestions(searchString);
}
