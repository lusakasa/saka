import { getFilteredSuggestions, objectFromArray } from 'lib/utils.js';

export async function allTabSuggestions() {
  const tabs = await browser.tabs.query({});
  console.error(tabs);
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
      lastAccessed
    })
  );
}

async function recentTabSuggestions() {
  const tabs = await allTabSuggestions();
  const tabsMap = objectFromArray(tabs, 'tabId');
  console.warn('TypeOf tabsMap: ', typeof Object.values(tabsMap));
  console.warn('tabsMap: ', Object.values(tabsMap));
  console.warn('tabsMap spread: ', ...Object.values(tabsMap));
  const { tabHistory } = await browser.runtime.getBackgroundPage();
  const recentTabs = tabHistory.map(tabId => {
    const tab = tabsMap[tabId];
    delete tabsMap[tabId];
    return tab;
  });
  console.warn('final: ', [...recentTabs, ...Object.values(tabsMap)]);
  return [...recentTabs, ...Object.values(tabsMap)];
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
