import Fuse from 'fuse.js';
import { isURL, extractProtocol, isProtocol } from 'lib/url.js';

// https://github.com/nwjs/chromium.src/blob/45886148c94c59f45f14a9dc7b9a60624cfa626a/components/omnibox/browser/bookmark_provider.cc
async function allBookmarkSuggestions(searchText) {
  const searchCriteria = searchText === '' ? {} : searchText;
  const searchResults = await browser.bookmarks.search(searchCriteria);

  const filteredResults = [];
  searchResults.forEach(({ url, title }) => {
    const protocol = extractProtocol(url);
    if (isURL(url) && isProtocol(protocol)) {
      filteredResults.push({
        type: 'bookmark',
        score: -1,
        title,
        url
      });
    }
  });

  return filteredResults;
}

async function filteredBookmarkSuggestions(searchString) {
  const bookmarks = await allBookmarkSuggestions(searchString);
  const fuse = new Fuse(bookmarks, {
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

export default async function bookmarkSuggestions(searchString) {
  return searchString === ''
    ? allBookmarkSuggestions(searchString)
    : filteredBookmarkSuggestions(searchString);
}
