import closedTabSuggestions from 'suggestions/closedTabs';

// Mode for selecting tabs
export async function closedTabModeSuggestions (searchString) {
  return closedTabSuggestions(searchString);
}
