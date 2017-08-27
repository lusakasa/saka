import { modeSuggestions } from 'suggestions/mode';

export async function modeModeSuggestions (searchString) {
  return modeSuggestions(searchString);
}
