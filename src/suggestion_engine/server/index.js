import * as providers from './providers';

export async function getSuggestions ([mode, searchString]) {
  return providers[mode](searchString);
}

export async function activateSuggestion (suggestion) {
  switch (suggestion.type) {
    case 'tab':
      await browser.tabs.update(suggestion.tabId, { active: true });
      await browser.windows.update(suggestion.windowId, { focused: true });
      break;
    case 'closedTab':
      await browser.sessions.restore(suggestion.sessionId);
      break;
    case 'bookmark':
      await browser.tabs.create({ url: suggestion.url });
      break;
    default:
      console.error(`activation not yet implemented for suggestions of type ${suggestion.type}`);
  }
}
