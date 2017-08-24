// import { MAX_RESULTS } from './';
import Fuse from 'fuse.js';

export default async function tabSuggestions (searchText) {
  const tabs = await browser.tabs.query({});
  const fuse = new Fuse(tabs, {
    shouldSort: true,
    threshold: 0.5,
    minMatchCharLength: 1,
    includeMatches: true,
    keys: ['title', 'url']
  });
  return fuse.search(searchText)
    .map(({
      item: { id: tabId, windowId, title, url },
      matches,
      score
    }) => ({
      score,
      type: 'tab',
      tabId,
      windowId,
      title,
      url,
      matches
    }));
}
