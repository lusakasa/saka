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
      const trackedHistory = {
        tabHistory: [
          { tabId: 1, lastAccessed: 123456 },
          { tabId: 0, lastAccessed: 654321 }
        ],
        recentlyClosed: [
          { tab: { tabId: 1, lastAccessed: 111111 } },
          { tab: { tabId: 4, lastAccessed: 222222 } }
        ]
      };

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
          lastAccessed: 1524794.2,
          score: 1,
          originalType: 'history'
        },
        {
          lastAccessed: 19191,
          tabId: 2,
          title: 'Recently Viewed Mode',
          url: 'https://github.com/lusakasa/saka/pull/45',
          favIconUrl: null,
          incognito: true,
          sessionId: '123abc',
          score: undefined,
          type: 'recentlyViewed',
          originalType: 'closedTab'
        },
        {
          type: 'recentlyViewed',
          tabId: 0,
          windowId: 0,
          title: 'Saka',
          url: 'https://github.com/lusakasa/saka',
          favIconUrl: null,
          incognito: true,
          lastAccessed: 654.321,
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
          lastAccessed: 123.456,
          originalType: 'tab'
        }
      ];

      const searchString = '';
      const sakaId = 'abcdefg/saka.html';
      browser.tabs.query.returns(tabResults);
      browser.runtime.getURL.returns(sakaId);
      browser.runtime.getBackgroundPage.returns(trackedHistory);
      browser.sessions.getRecentlyClosed.returns(recentlyClosedResults);
      browser.history.search.returns(historyResults);
      //   browser.storage.sync.get.returns(settingsStore);
      expect(await recentlyViewedSuggestions(searchString)).toEqual(
        expectedResult
      );
    });

    it('should return matching recently viewed tabs when search string is not empty', async () => {
      const tabHistory = { tabHistory: [0] };
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
          tabId: 0,
          windowId: 0,
          title: 'Saka',
          url: 'https://github.com/lusakasa/saka',
          favIconUrl: null,
          incognito: true,
          lastAccessed: 654.321,
          originalType: 'tab',
          score: undefined,
          matches: [
            Object({
              indices: [[0, 3]],
              value: 'Saka',
              key: 'title',
              arrayIndex: 0
            }),
            Object({
              indices: [[4, 4], [21, 24]],
              value: 'https://github.com/lusakasa/saka',
              key: 'url',
              arrayIndex: 0
            })
          ]
        },
        {
          type: 'recentlyViewed',
          url: 'https://github.com/lusakasa/saka',
          title: 'Saka Github',
          lastAccessed: 1524795.334,
          score: undefined,
          originalType: 'history',
          matches: [
            Object({
              indices: [[0, 3]],
              value: 'Saka Github',
              key: 'title',
              arrayIndex: 0
            }),
            Object({
              indices: [[4, 4], [21, 24]],
              value: 'https://github.com/lusakasa/saka',
              key: 'url',
              arrayIndex: 0
            })
          ]
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
          originalType: 'closedTab',
          matches: [
            Object({
              indices: [[4, 4], [21, 24]],
              value: 'https://github.com/lusakasa/saka/pull/45',
              key: 'url',
              arrayIndex: 0
            })
          ]
        }
      ];

      const searchString = 'saka';
      const sakaId = 'abcdefg/saka.html';
      browser.tabs.query.returns(tabResults);
      browser.runtime.getURL.returns(sakaId);
      browser.runtime.getBackgroundPage.returns(tabHistory);
      browser.sessions.getRecentlyClosed.returns(recentlyClosedResults);
      browser.history.search.returns(historyResults);
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
