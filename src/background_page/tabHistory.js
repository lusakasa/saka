import 'lib/browser_polyfill';

// list of tab ids in order of increasing age since last visit
export let tabHistory = [];

const log = (listener) => (...args) => {
  listener(...args);
  // if (SAKA_DEBUG) console.log(tabHistory);
};

browser.tabs.onActivated.addListener(log(({ tabId }) => {
  const i = tabHistory.indexOf(tabId);
  if (i !== -1) {
    tabHistory.splice(i, 1);
  }
  tabHistory.unshift(tabId);
}));

browser.tabs.onRemoved.addListener(log((tabId) => {
  const i = tabHistory.indexOf(tabId);
  tabHistory.splice(i, 1);
}));

browser.tabs.onReplaced.addListener(log((addedTabId, removedTabId) => {
  const i = tabHistory.indexOf(removedTabId);
  tabHistory[i] = addedTabId;
}));
