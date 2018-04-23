import Fuse from 'fuse.js';
import { isSakaUrl } from 'lib/url.js';
import { filter } from 'rxjs/operator/filter';

async function getAllSuggestions() {
  const sessions = await browser.sessions.getRecentlyClosed();
  const filteredSessions = [];

  // TODO: This for loop is currently flagged by the airbnb eslint rules.
  // See: https://github.com/airbnb/javascript/issues/1271
  // Not disabling the rule as this might be fixable in the future using filter.
  // This for loop is needed at the moment as a workaround since filter does not support async.
  for (const session of sessions) {
    const sakaUrl = await isSakaUrl(session.tab.url);
    if (session.tab && !sakaUrl) {
      filteredSessions.push(session);
    }
  }

  return filteredSessions.map(session => {
    const { id, sessionId, title, url, favIconUrl } = session.tab;
    return {
      type: 'closedTab',
      tabId: id,
      sessionId,
      score: undefined,
      title,
      url,
      favIconUrl
    };
  });
}

async function getFilteredSuggestions(searchString) {
  const fuse = new Fuse(await getAllSuggestions(), {
    shouldSort: true,
    threshold: 0.5,
    minMatchCharLength: 1,
    includeMatches: true,
    keys: ['title', 'url']
  });
  return fuse.search(searchString).map(({ item, matches, score }) => ({
    ...item,
    score,
    matches
  }));
}

export default async function closedTabSuggestions(searchString) {
  return searchString === ''
    ? getAllSuggestions()
    : getFilteredSuggestions(searchString);
}
