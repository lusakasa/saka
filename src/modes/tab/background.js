import search from './search.js';

export default {
  mode: 'tab',
  search,
  activate: async (result, query) => {
    await browser.tabs.update(result.tabId, { active: true });
    await browser.windows.update(result.windowId, { focused: true });
  }
};
