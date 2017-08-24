export default async function closedTabSuggestions () {
  const sessions = await browser.sessions.getRecentlyClosed();
  return sessions
    // only show tabs not windows, TODO: show windows too
    .filter((session) => session.tab)
    .map((session) => {
      const { id, sessionId, title, url } = session.tab;
      return {
        type: 'closedTab',
        tabId: id,
        sessionId,
        score: undefined,
        title,
        url
      };
    });
}
