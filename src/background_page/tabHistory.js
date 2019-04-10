import browser from 'webextension-polyfill';

// list of tab ids in order of increasing age since last visit
export const tabHistory = [];

// list of tab ids in order of increasing age since closed
export const recentlyClosed = [];

const log = listener => (...args) => {
  listener(...args);
  // if (SAKA_DEBUG) console.log(tabHistory);
};

function setMostRecentTab(tabInfo) {
  const tabIndex = tabHistory.findIndex(tab => tab.tabId === tabInfo.tabId);

  if (tabIndex !== -1) {
    tabHistory.splice(tabIndex, 1);
  }
  tabHistory.unshift(tabInfo);
}

function setMostRecentClosedTab(tabInfo) {
  const tabIndex = recentlyClosed.findIndex(tab => tab.tabId === tabInfo.tabId);

  if (tabIndex !== -1) {
    recentlyClosed.splice(tabIndex, 1);
  }
  recentlyClosed.unshift(tabInfo);
}

browser.tabs.onActivated.addListener(
  log(({ tabId }) => {
    setMostRecentTab({ tabId, lastAccessed: Date.now() });
  })
);

browser.tabs.onRemoved.addListener(
  log(tabId => {
    const i = tabHistory.findIndex(tab => tab.tabId === tabId);
    tabHistory.splice(i, 1);
    setMostRecentClosedTab({ tabId, lastAccessed: Date.now() });
  })
);

browser.tabs.onReplaced.addListener(
  log((addedTabId, removedTabId) => {
    const i = tabHistory.findIndex(tab => tab.tabId === removedTabId);
    tabHistory[i] = { tabId: addedTabId, lastAccessed: Date.now() };
  })
);

browser.windows.onFocusChanged.addListener(async windowId => {
  const [tab] = await browser.tabs.query({ currentWindow: true, active: true });
  if (tab && tab.windowId === windowId) {
    setMostRecentTab({ tabId: tab.id, lastAccessed: Date.now() });
  }
});
