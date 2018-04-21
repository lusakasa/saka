import { isURL, extractProtocol, isProtocol } from 'lib/url';

// https://github.com/nwjs/chromium.src/blob/45886148c94c59f45f14a9dc7b9a60624cfa626a/components/omnibox/browser/bookmark_provider.cc
export default async function bookmarkSuggestions(searchText) {
  const searchCriteria = searchText === '' ? {} : searchText;
  const searchResults = await browser.bookmarks.search(searchCriteria);

  const filteredResults = [];
  searchResults.forEach(({ url, title, dateAdded }) => {
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
