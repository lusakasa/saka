import 'lib/browser_polyfill';
import Fuse from 'fuse.js';

// Given search text, returns a list of suggestions
// Operates in two passes:
//   1. Fetch results that are available locally and can be returned immediately
//      * built-in commands
//      * history
//      * previous searches <- by checking history for https://www.google.com/search?q={searchText}
//      * open tabs
//      * bookmarks
//   2. Fetch results from the network that take longer
//      * google autocomplete suggestions

// TODO: review chromium's omnibox implementation to determine how to get better
// scoring/suggestions

const MAX_RESULTS = 6;

export async function fastSuggestions (searchText) {
  try {
    return searchText === ''
      ? []
      : [
        ...await tabSuggestions(searchText),
        ...commandSuggestions(searchText),
        ...await historySuggestions(searchText),
        ...await bookmarkSuggestions(searchText)
      ].slice(0, MAX_RESULTS);
  } catch (e) {
    if (SAKA_DEBUG) {
      console.log(e);
    }
    return [];
  }
}

export async function slowSuggestions (searchText) {
  return searchEngineSuggestions(searchText).slice(0, MAX_RESULTS);
}

// https://github.com/nwjs/chromium.src/blob/45886148c94c59f45f14a9dc7b9a60624cfa626a/components/omnibox/browser/bookmark_provider.cc
async function bookmarkSuggestions (searchText) {
  const results = await browser.bookmarks.search(searchText);
  return results.map(({ url, title, dateAdded }) => ({
    type: 'bookmark',
    score: -1,
    title,
    url
  }));
}

async function historySuggestions (searchText) {
  const results = await browser.history.search({ text: searchText, maxResults: MAX_RESULTS });
  return results.map(({ url, title, lastVisitTime, visitCount, typedCount }) => ({
    type: 'history',
    score: visitCount + typedCount,
    title,
    url
  }));
}

export async function tabSuggestions (searchText) {
  const tabs = await browser.tabs.query({});
  const fuse = new Fuse(tabs, {
    shouldSort: true,
    threshold: 0.5,
    minMatchCharLength: 1,
    includeMatches: true,
    keys: ['title', 'url']
  });
  const results = fuse.search(searchText);
  return results.slice(0, MAX_RESULTS).map(({
    item: { id: tabId, windowId, title, url },
    score
  }) => ({
    type: 'tab',
    tabId,
    windowId,
    score,
    title,
    url
  }));
}

const commands = [
  'search',
  'help',
  'history',
  'tabs',
  'define'
];

function commandSuggestions (searchText) {
  return commands
    .filter((command) => command.startsWith(searchText))
    .map((command) => ({
      type: 'command',
      score: -1,
      title: command
    }));
}

// function commandSuggestions (searchText) {
//   // return commands.filter((command) => command.beginsWith(searchText));
//   return [];
// }

async function searchEngineSuggestions (searchText) {
  try {
    const baseURL = 'https://www.google.com/complete/search?client=chrome-omni&q=';
    const response = await fetch(`${baseURL}${encodeURIComponent(searchText)}`);
    const json = await response.json();
    return json[1].slice(0, MAX_RESULTS).map((result) => ({
      type: 'searchEngine',
      score: -1,
      title: result
    }));
  } catch (e) {
    return [];
  }
}
