import msg from 'msg/client.js';

export async function getSuggestions(mode, searchString) {
  return msg('sg', [mode, searchString]);
}

export async function activateSuggestion(suggestion) {
  return msg('activateSuggestion', suggestion);
}

export async function closeTab(suggestion) {
  return msg('closeTab', suggestion);
}
