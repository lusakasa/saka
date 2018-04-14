const browser = require('sinon-chrome/webextensions');
import closedTabSuggestions from 'suggestion_engine/server/providers/closedTab.js';

describe('server/providers/bookmark ', function() {
  beforeAll(function() {
    global.browser = browser;
  });

  beforeEach(function() {
    browser.flush();
  });

  describe('closedTabSuggestions ', function() {
    it('should return all closed tabs when no search string provided', async function() {
      const queryResults = [
        {
          tab: {
            id: 1,
            windowId: 0,
            title: 'Saka',
            url: 'https://github.com/lusakasa/saka',
            favIconUrl: 'https://github.com/lusakasa/saka/icon.png'
          }
        }
      ];
      const expectedResult = [
        {
          type: 'closedTab',
          tabId: 1,
          title: 'Saka',
          url: 'https://github.com/lusakasa/saka',
          favIconUrl: 'https://github.com/lusakasa/saka/icon.png',
          sessionId: undefined,
          score: undefined
        }
      ];

      const searchString = '';
      browser.sessions.getRecentlyClosed.returns(queryResults);
      expect(await closedTabSuggestions(searchString)).toEqual(expectedResult);
    });

    it('should filter out entries for saka in recently closed tabs', async function() {
      const queryResults = [
        {
          tab: {
            id: 1,
            windowId: 0,
            title: 'Saka',
            url: 'https://github.com/lusakasa/saka',
            favIconUrl: 'https://github.com/lusakasa/saka/icon.png'
          }
        },
        {
          tab: {
            id: 2,
            windowId: 0,
            title: 'Saka Extension',
            url:
              'chrome-extension://nbdfpcokndmapcollfpjdpjlabnibjdi/saka.html',
            favIconUrl: ''
          }
        }
      ];
      const expectedResult = [
        {
          type: 'closedTab',
          tabId: 1,
          title: 'Saka',
          url: 'https://github.com/lusakasa/saka',
          favIconUrl: 'https://github.com/lusakasa/saka/icon.png',
          sessionId: undefined,
          score: undefined
        }
      ];

      const searchString = '';
      browser.sessions.getRecentlyClosed.returns(queryResults);
      expect(await closedTabSuggestions(searchString)).toEqual(expectedResult);
    });

    it('should return all closed tabs matching searchString', async function() {
      const queryResults = [
        {
          tab: {
            id: 1,
            windowId: 0,
            title: 'Saka',
            url: 'https://github.com/lusakasa/saka',
            favIconUrl: 'https://github.com/lusakasa/saka/icon.png'
          }
        },
        {
          tab: {
            id: 2,
            windowId: 0,
            title: 'Google',
            url: 'https://google.com',
            favIconUrl: 'https://google.com/icon.png'
          }
        }
      ];
      const expectedResult = [
        {
          type: 'closedTab',
          tabId: 2,
          title: 'Google',
          url: 'https://google.com',
          favIconUrl: 'https://google.com/icon.png',
          sessionId: undefined,
          score: undefined,
          matches: [
            {
              indices: [[0, 3]],
              value: 'Google',
              key: 'title',
              arrayIndex: 0
            },
            {
              indices: [[8, 11]],
              value: 'https://google.com',
              key: 'url',
              arrayIndex: 0
            }
          ]
        }
      ];

      const searchString = 'Goog';
      browser.sessions.getRecentlyClosed.returns(queryResults);
      expect(await closedTabSuggestions(searchString)).toEqual(expectedResult);
    });
  });

  afterAll(function() {
    browser.flush();
    delete global.browser;
  });
});
