import 'lib/browser_polyfill';
import tabSuggestions from './tabs';
import commandSuggestions from './commands';
import historySuggestions from './history';
import bookmarkSuggestions from './bookmarks';
import searchEngineSuggestions from './searchEngine';

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

export const MAX_RESULTS = 6;

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

export async function activate (suggestion) {
  switch (suggestion.type) {
    case 'tab':
      await browser.tabs.update(suggestion.tabId, { active: true });
      await browser.windows.update(suggestion.windowId, { focused: true });
      break;
    case 'closedTab':
      await browser.sessions.restore(suggestion.sessionId);
      break;
    default:
      console.error(`activation not yet implemented for suggestions of type ${suggestion.type}`)
  }
}
