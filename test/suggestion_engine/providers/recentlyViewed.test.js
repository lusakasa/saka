const browser = require('sinon-chrome/webextensions');

import recentlyViewedSuggestions from 'suggestion_engine/server/providers/recentlyViewed.js';

describe('server/providers/recentlyViewed ', () => {
  beforeAll(() => {
    global.browser = browser;
  });

  beforeEach(() => {
    browser.flush();
  });

  describe('recentlyViewedSuggestions ', () => {
    it('should return all recently viewed tabs when search string is empty', async () => {
      const tabHistory = { tabHistory: [1] };
      const tabResults = [
        {
          id: 1,
          windowId: 0,
          title: 'Google',
          url: 'https://google.com',
          favIconUrl: 'https://google.com/icon.png',
          incognito: false,
          lastAccessed: 123456
        },
        {
          id: 0,
          windowId: 0,
          title: 'Saka',
          url: 'https://github.com/lusakasa/saka',
          favIconUrl: 'https://github.com/lusakasa/saka/icon.png',
          incognito: true,
          lastAccessed: 654321
        }
      ];

      const recentlyClosedResults = [
        {
          lastModified: 123456,
          tab: {
            id: 1,
            windowId: 0,
            title: 'Saka',
            url: 'https://github.com/lusakasa/saka',
            favIconUrl: 'https://github.com/lusakasa/saka/icon.png',
            incognito: false,
            sessionId: 'abc123'
          }
        },
        {
          lastModified: 19191,
          tab: {
            id: 2,
            windowId: 0,
            title: 'Recently Viewed Mode',
            url: 'https://github.com/lusakasa/saka/pull/45',
            favIconUrl: 'https://github.com/icon.png',
            incognito: true,
            sessionId: '123abc'
          }
        }
      ];

      const historyResults = [
        {
          id: 1,
          url: 'https://github.com/lusakasa/saka',
          title: 'Saka Github',
          lastVisitTime: 1524795334,
          visitCount: 5,
          typedCount: 10
        },
        {
          id: 3,
          url: 'https://example.com',
          title: 'Example',
          lastVisitTime: 1524794200,
          visitCount: 1,
          typedCount: 0
        }
      ];

      const expectedResult = [
        {
          type: 'recentlyViewed',
          url: 'https://example.com',
          title: 'Example',
          lastAccessed: 1524794200,
          score: 1,
          originalType: 'history'
        },
        {
          type: 'recentlyViewed',
          tabId: 0,
          windowId: 0,
          title: 'Saka',
          url: 'https://github.com/lusakasa/saka',
          favIconUrl: null,
          incognito: true,
          lastAccessed: 654321,
          originalType: 'tab'
        },
        {
          type: 'recentlyViewed',
          tabId: 1,
          windowId: 0,
          title: 'Google',
          url: 'https://google.com',
          favIconUrl: 'https://google.com/icon.png',
          incognito: false,
          lastAccessed: 123456,
          originalType: 'tab'
        },
        {
          type: 'recentlyViewed',
          tabId: 2,
          title: 'Recently Viewed Mode',
          url: 'https://github.com/lusakasa/saka/pull/45',
          favIconUrl: null,
          incognito: true,
          lastAccessed: 19191,
          sessionId: '123abc',
          score: undefined,
          originalType: 'closedTab'
        }
      ];

      const searchString = '';
      const sakaId = 'abcdefg/saka.html';
      browser.tabs.query.returns(tabResults);
      browser.runtime.getURL.returns(sakaId);
      browser.runtime.getBackgroundPage.returns(tabHistory);
      browser.sessions.getRecentlyClosed.returns(recentlyClosedResults);
      browser.history.search.returns(historyResults);
      //   browser.storage.sync.get.returns(settingsStore);
      expect(await recentlyViewedSuggestions(searchString)).toEqual(
        expectedResult
      );
    });
  });

  afterAll(() => {
    browser.flush();
    delete global.browser;
  });
});