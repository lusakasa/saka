import { MAX_RESULTS } from './';

export default async function recentTabSuggestions () {
  const { tabHistory } = await browser.runtime.getBackgroundPage();
  const tabs = await browser.tabs.query({});
  return tabHistory
    .slice(0, MAX_RESULTS)
    .map((tabId) => {
      const { id, windowId, title, url } = tabs.find((tab) => tab.id === tabId);
      return {
        type: 'tab',
        tabId: id,
        windowId,
        score: undefined,
        title,
        url
      };
    });
}
