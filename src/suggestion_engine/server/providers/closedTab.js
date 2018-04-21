import Fuse from 'fuse.js';

async function getAllSuggestions() {
  const sessions = await browser.sessions.getRecentlyClosed();
  return (
    sessions
      // only show tabs not windows, TODO: show windows too
      .filter(
        session =>
          session.tab &&
          session.tab.url !==
            'chrome-extension://nbdfpcokndmapcollfpjdpjlabnibjdi/saka.html'
      )
      .map(session => {
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
      })
  );
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
