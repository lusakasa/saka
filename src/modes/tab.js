import tabSuggestions from 'suggestions/tabs';

// Mode for selecting tabs
export async function tabModeSuggestions (searchString) {
  return tabSuggestions(searchString);
}
