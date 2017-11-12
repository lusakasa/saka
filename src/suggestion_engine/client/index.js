import msg from 'msg/client';

export async function getSuggestions (mode, searchString) {
  return msg('sg', [mode, searchString]);
}

export async function activateSuggestion (suggestion) {
  return msg('activateSuggestion', suggestion);
}
