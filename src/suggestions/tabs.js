import { MAX_RESULTS } from './';
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
  const results = fuse.search(searchText);
  return results
    .slice(0, MAX_RESULTS)
    .map(({
      item: { id: tabId, windowId, title, url },
      score
    }) => ({
      type: 'tab',
      tabId,
      windowId,
      score,
      title,
      url
    }));
}
