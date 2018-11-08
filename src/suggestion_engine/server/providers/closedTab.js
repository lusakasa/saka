import { isSakaUrl } from 'lib/url.js';
// import { filter } from 'rxjs/operator/filter';
import { allTabSuggestions } from './tab.js';
import { getFilteredSuggestions } from 'lib/utils.js';

export async function getAllSuggestions() {
  const sessions = await browser.sessions.getRecentlyClosed();
  const filteredSessions = [];

  // TODO: This for loop is currently flagged by the airbnb eslint rules.
  // See: https://github.com/airbnb/javascript/issues/1271
  // Not disabling the rule as this might be fixable in the future using filter.
  // This for loop is needed at the moment as a workaround since filter does not support async.
  for (const session of sessions) {
    if (session.tab && !(await isSakaUrl(session.tab.url))) {
      filteredSessions.push(session);
    } else if (session.window && session.window.tabs) {
      for (const tabSession of session.window.tabs) {
        if (tabSession && !(await isSakaUrl(tabSession.url))) {
          filteredSessions.push({
            lastModified: session.window.lastModified,
            tab: {
              ...tabSession,
              sessionId: session.window.sessionId
            }
          });
        }
      }
    }
  }

  return filteredSessions.map(session => {
    const { lastModified } = session;
    const { id, sessionId, title, url, favIconUrl, incognito } = session.tab;
    return {
      type: 'closedTab',
      tabId: id,
      sessionId,
      score: undefined,
      title,
      url,
      favIconUrl: incognito ? null : favIconUrl,
      incognito,
      lastAccessed: lastModified
    };
  });
}

// TODO: Remove when Chrome gets proper timestamp
export async function recentlyClosedTabSuggestions() {
  const { recentlyClosed } = await browser.runtime.getBackgroundPage();
  const sessions = await browser.sessions.getRecentlyClosed();
  const filteredSessions = [];

  // TODO: This for loop is currently flagged by the airbnb eslint rules.
  // See: https://github.com/airbnb/javascript/issues/1271
  // Not disabling the rule as this might be fixable in the future using filter.
  // This for loop is needed at the moment as a workaround since filter does not support async.
  for (const session of sessions) {
    if (session.tab && !(await isSakaUrl(session.tab.url))) {
      filteredSessions.push(session);
    }
  }

  return filteredSessions
    .map(session => {
      const foundTab = recentlyClosed.findIndex(tab => {
        return tab.tabId === session.tab.id;
      });

      if (foundTab !== -1) {
        return { ...session, lastModified: recentlyClosed.tab.lastAccessed };
      }

      return session;
    })
    .map(session => {
      const { lastModified } = session;
      const { id, sessionId, title, url, favIconUrl, incognito } = session.tab;
      return {
        type: 'closedTab',
        tabId: id,
        sessionId,
        score: undefined,
        title,
        url,
        favIconUrl: incognito ? null : favIconUrl,
        incognito,
        lastAccessed: lastModified
      };
    });
}

export default async function closedTabSuggestions(searchString) {
  return searchString === ''
    ? getAllSuggestions()
    : getFilteredSuggestions(searchString, {
        getSuggestions: getAllSuggestions,
        threshold: 0.5,
        keys: ['title', 'url']
      });
}
