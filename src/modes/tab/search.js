import { getFilteredSuggestions, objectFromArray } from 'lib/utils.js';

export async function allTabSuggestions() {
  const tabs = await browser.tabs.query({});
  return tabs.map(
    ({
      id: tabId,
      windowId,
      title,
      url,
      favIconUrl,
      incognito,
      lastAccessed
    }) => ({
      type: 'tab',
      tabId,
      windowId,
      title,
      url,
      favIconUrl: incognito ? null : favIconUrl,
      incognito,
      lastAccessed: lastAccessed * 0.001
    })
  );
}

async function recentTabSuggestions() {
  const tabs = await allTabSuggestions();
  const tabsMap = objectFromArray(tabs, 'tabId');
  const { tabHistory } = await browser.runtime.getBackgroundPage();

  const recentTabs = tabHistory.map(recentlyUsedTab => {
    const tab = tabsMap[recentlyUsedTab.tabId];
    delete tabsMap[recentlyUsedTab.tabId];
    return { ...tab, lastAccessed: recentlyUsedTab.lastAccessed };
  });

  return [...recentTabs, ...Object.values(tabsMap)];
}

// TODO: Remove this once chrome tab API provides recently viewed
export async function recentVisitedTabSuggestions() {
  const tabs = await allTabSuggestions();
  const tabsMap = objectFromArray(tabs, 'tabId');
  const { tabHistory } = await browser.runtime.getBackgroundPage();

  const recentTabs = tabHistory.map(recentlyUsedTab => {
    const tab = tabsMap[recentlyUsedTab.tabId];
    delete tabsMap[recentlyUsedTab.tabId];
    return { ...tab, lastAccessed: recentlyUsedTab.lastAccessed * 0.001 };
  });

  return [...recentTabs];
}

export default async function tabSuggestions(searchString) {
  return searchString === ''
    ? recentTabSuggestions()
    : getFilteredSuggestions(searchString, {
        getSuggestions: allTabSuggestions,
        threshold: 0.5,
        keys: ['title', 'url']
      });
}
