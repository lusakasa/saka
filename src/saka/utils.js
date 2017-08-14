import { isURL } from 'lib/url';/**

 * Given the URL of a suggestion and the search text, makes the URL nicer
 * @param {string} url - the suggestion URL
 * @param {string} searchText - the text in the search bar
 */
export function prettifyURL (url, searchText) {
  if (url.endsWith('/')) {
    url = url.substr(0, url.length - 1);
  }
  if (!searchText.startsWith('http://') && url.startsWith('http://')) {
    url = url.substr(7);
  }
  return url;
}

export function preprocessSuggestion (suggestion, searchText) {
  switch (suggestion.type) {
    case 'tab': {
      const prettyURL = prettifyURL(suggestion.url, searchText);
      return {
        ...suggestion,
        prettyURL,
        text: suggestion.title
      };
    }
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
      } else {
        return {
          ...suggestion,
          isURL: false,
          text: suggestion.title
        };
      }
    }
    default:
      return {
        type: 'error',
        title: `Error. Unknown Suggestion type: ${suggestion.type}`,
        text: `Error. Unknown Suggestion type: ${suggestion.type}`
      };
  }
}

/**
 * Return whether the cursor is at the far right end of the
 * provided HTML input
 * @param {HTMLInputElement} input
 */
export function cursorAtEnd (input) {
  return input && input.selectionStart === input.value.length;
}
