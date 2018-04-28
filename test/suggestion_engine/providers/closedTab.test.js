const browser = require('sinon-chrome/webextensions');

import closedTabSuggestions from 'suggestion_engine/server/providers/closedTab.js';

describe('server/providers/bookmark ', () => {
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
      const sakaId = 'abcdefg/saka.html';
      browser.runtime.getURL.returns(sakaId);
      browser.sessions.getRecentlyClosed.returns(queryResults);
      expect(await closedTabSuggestions(searchString)).toEqual(expectedResult);
    });

    it('should filter out entries for saka in recently closed tabs', async () => {
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
            url: 'chrome-extension://abcdefg/saka.html',
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
      const sakaId = 'abcdefg/saka.html';
      browser.runtime.getURL.returns(sakaId);
      browser.sessions.getRecentlyClosed.returns(queryResults);
      expect(await closedTabSuggestions(searchString)).toEqual(expectedResult);
    });

    it('should return all closed tabs matching searchString', async () => {
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
      const sakaId = 'abcdefg/saka.html';
      browser.runtime.getURL.returns(sakaId);
      browser.sessions.getRecentlyClosed.returns(queryResults);
      expect(await closedTabSuggestions(searchString)).toEqual(expectedResult);
    });
  });

  afterAll(() => {
    browser.flush();
    delete global.browser;
  });
});
