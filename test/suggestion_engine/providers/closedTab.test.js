const browser = require('sinon-chrome/webextensions');

import closedTabSuggestions, {
  getAllSuggestions
} from 'suggestion_engine/server/providers/closedTab.js';

describe('server/providers/closedTabs ', () => {
  beforeAll(() => {
    global.browser = browser;
  });

  beforeEach(() => {
    browser.flush();
  });

  describe('closedTabSuggestions ', () => {
    it('should return all closed tabs when no search string provided', async () => {
      const queryResults = [
        {
          lastModified: 123456,
          tab: {
            id: 1,
            windowId: 0,
            title: 'Saka',
            url: 'https://github.com/lusakasa/saka',
            favIconUrl: 'https://github.com/lusakasa/saka/icon.png',
            incognito: false
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
          score: undefined,
          incognito: false,
          lastAccessed: 123456
        }
      ];

      const searchString = '';
      const sakaId = 'abcdefg/saka.html';
      browser.runtime.getURL.returns(sakaId);
      browser.sessions.getRecentlyClosed.returns(queryResults);
      expect(await closedTabSuggestions(searchString)).toEqual(expectedResult);
    });

    it('should filter out entries for saka in recently closed tabs', async () => {
      const queryResults = [
        {
          lastModified: 123456,
          tab: {
            id: 1,
            windowId: 0,
            title: 'Saka',
            url: 'https://github.com/lusakasa/saka',
            favIconUrl: 'https://github.com/lusakasa/saka/icon.png',
            incognito: true
          }
        },
        {
          lastModified: 654321,
          tab: {
            id: 2,
            windowId: 0,
            title: 'Saka Extension',
            url: 'chrome-extension://abcdefg/saka.html',
            favIconUrl: '',
            incognito: false
          }
        }
      ];
      const expectedResult = [
        {
          type: 'closedTab',
          tabId: 1,
          title: 'Saka',
          url: 'https://github.com/lusakasa/saka',
          favIconUrl: null,
          sessionId: undefined,
          score: undefined,
          incognito: true,
          lastAccessed: 123456
        }
      ];

      const searchString = '';
      const sakaId = 'abcdefg/saka.html';
      browser.runtime.getURL.returns(sakaId);
      browser.sessions.getRecentlyClosed.returns(queryResults);
      expect(await closedTabSuggestions(searchString)).toEqual(expectedResult);
    });

    it('should return all closed tabs matching searchString', async () => {
      const queryResults = [
        {
          lastModified: 123456,
          tab: {
            id: 1,
            windowId: 0,
            title: 'Saka',
            url: 'https://github.com/lusakasa/saka',
            favIconUrl: 'https://github.com/lusakasa/saka/icon.png',
            incognito: false
          }
        },
        {
          lastModified: 654321,
          tab: {
            id: 2,
            windowId: 0,
            title: 'Google',
            url: 'https://google.com',
            favIconUrl: 'https://google.com/icon.png',
            incognito: true
          }
        }
      ];
      const expectedResult = [
        {
          type: 'closedTab',
          tabId: 2,
          title: 'Google',
          url: 'https://google.com',
          favIconUrl: null,
          sessionId: undefined,
          score: undefined,
          incognito: true,
          lastAccessed: 654321,
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
      const sakaId = 'abcdefg/saka.html';
      browser.runtime.getURL.returns(sakaId);
      browser.sessions.getRecentlyClosed.returns(queryResults);
      expect(await closedTabSuggestions(searchString)).toEqual(expectedResult);
    });
  });

  describe('getAllSuggestions', () => {
    it('should work for window sessions', async () => {
      const queryResults = [
        {
          window: {
            lastModified: 123456,
            tabs: [
              {
                id: 1,
                windowId: 0,
                title: 'Saka',
                url: 'https://github.com/lusakasa/saka',
                favIconUrl: 'https://github.com/lusakasa/saka/icon.png',
                incognito: false
              }
            ]
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
          score: undefined,
          incognito: false,
          lastAccessed: 123456
        }
      ];

      const sakaId = 'abcdefg/saka.html';
      browser.runtime.getURL.returns(sakaId);
      browser.sessions.getRecentlyClosed.returns(queryResults);
      expect(await getAllSuggestions()).toEqual(expectedResult);
    });
  });

  afterAll(() => {
    browser.flush();
    delete global.browser;
  });
});
