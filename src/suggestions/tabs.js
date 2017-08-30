import Fuse from 'fuse.js';
import { objectFromArray } from 'lib/utils';

export default async function tabSuggestions (searchString) {
  return searchString === ''
    ? recentTabSuggestions()
    : filteredTabSuggestions(searchString);
}

async function filteredTabSuggestions (searchString) {
  const tabs = await allTabSuggestions();
  const fuse = new Fuse(tabs, {
    shouldSort: true,
    threshold: 0.5,
    minMatchCharLength: 1,
    includeMatches: true,
    keys: ['title', 'url']
  });
  return fuse.search(searchString)
    .map(({
      item,
      matches,
      score
    }) => ({
      ...item,
      score,
      matches
    }));
}

export async function recentTabSuggestions () {
  const tabs = await allTabSuggestions();
  const tabsMap = objectFromArray(tabs, 'tabId');
  const { tabHistory } = await browser.runtime.getBackgroundPage();
  const recentTabs = tabHistory
    .map((tabId) => {
      const tab = tabsMap[tabId];
      delete tabsMap[tabId];
      return tab;
    });
  return [...recentTabs, ...Object.values(tabsMap)];
}

export async function allTabSuggestions () {
  const tabs = await browser.tabs.query({});
  return tabs.map(({ id: tabId, windowId, title, url }) => ({
    type: 'tab',
    tabId,
    windowId,
    title,
    url
  }));
}
