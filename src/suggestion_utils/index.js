import { prettifyURL, isURL } from 'lib/url.js';

export const icons = {
  mode: 'apps',
  tab: 'tab',
  closedTab: 'restore_page',
  history: 'history',
  bookmark: 'bookmark_border',
  incognito: 'visibility_off'
};

export function preprocessSuggestion(suggestion, searchText) {
  switch (suggestion.type) {
    case 'tab': {
      const prettyURL = prettifyURL(suggestion.url, searchText);
      return {
        ...suggestion,
        prettyURL,
        text: suggestion.title
      };
    }
    case 'closedTab': {
      const prettyURL = prettifyURL(suggestion.url, searchText);
      return {
        ...suggestion,
        prettyURL,
        text: suggestion.title
      };
    }
    case 'mode':
      return suggestion;
    case 'bookmark': {
      const prettyURL = prettifyURL(suggestion.url, searchText);
      return {
        ...suggestion,
        prettyURL,
        text: prettyURL
      };
    }
    case 'history': {
      const prettyURL = prettifyURL(suggestion.url, searchText);
      return {
        ...suggestion,
        prettyURL,
        text: prettyURL
      };
    }
    case 'command': {
      return {
        ...suggestion,
        text: suggestion.title
      };
    }
    case 'searchEngine': {
      if (isURL(suggestion.title)) {
        const prettyURL = prettifyURL(suggestion.title, searchText);
        return {
          ...suggestion,
          isURL: true,
          prettyURL,
          text: prettyURL
        };
      }
      return {
        ...suggestion,
        isURL: false,
        text: suggestion.title
      };
    }
    default:
      return {
        type: 'error',
        title: `Error. Unknown Suggestion type: ${suggestion.type}`,
        text: `Error. Unknown Suggestion type: ${suggestion.type}`
      };
  }
}
