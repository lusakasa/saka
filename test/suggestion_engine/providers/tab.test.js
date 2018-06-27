const browser = require('sinon-chrome/webextensions');

import tabSuggestions from 'suggestion_engine/server/providers/tab.js';

describe('server/providers/tab ', () => {
  beforeAll(() => {
    global.browser = browser;
  });

  beforeEach(() => {
    browser.flush();
  });

  describe('tabSuggestions ', () => {
    it('should return all recent tabs when search string is empty', async () => {
      const queryResults = [
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

      const tabHistory = {
        tabHistory: [
          { tabId: 1, lastAccessed: 123456 },
          { tabId: 0, lastAccessed: 654321 }
        ]
      };

      const expectedResult = [
        {
          type: 'tab',
          tabId: 1,
          windowId: 0,
          title: 'Google',
          url: 'https://google.com',
          favIconUrl: 'https://google.com/icon.png',
          incognito: false,
          lastAccessed: 123456
        },
        {
          type: 'tab',
          tabId: 0,
          windowId: 0,
          title: 'Saka',
          url: 'https://github.com/lusakasa/saka',
          favIconUrl: null,
          incognito: true,
          lastAccessed: 654321
        }
      ];

      const searchString = '';
      browser.tabs.query.returns(queryResults);
      browser.runtime.getBackgroundPage.returns(tabHistory);
      expect(await tabSuggestions(searchString)).toEqual(expectedResult);
    });

    it('should return all tabs matching searchString', async () => {
      const queryResults = [
        {
          id: 0,
          windowId: 0,
          title: 'Saka',
          url: 'https://github.com/lusakasa/saka',
          favIconUrl: 'https://github.com/lusakasa/saka/icon.png',
          incognito: false,
          lastAccessed: 123456
        },
        {
          id: 0,
          windowId: 0,
          title: 'Google',
          url: 'https://google.com',
          favIconUrl: 'https://google.com/icon.png',
          incognito: false,
          lastAccessed: 654321
        }
      ];

      const expectedResult = [
        {
          type: 'tab',
          tabId: 0,
          windowId: 0,
          title: 'Saka',
          url: 'https://github.com/lusakasa/saka',
          favIconUrl: 'https://github.com/lusakasa/saka/icon.png',
          incognito: false,
          lastAccessed: 123456,
          matches: [
            {
              indices: [[0, 3]],
              value: 'Saka',
              key: 'title',
              arrayIndex: 0
            },
            {
              indices: [[4, 4], [21, 24]],
              value: 'https://github.com/lusakasa/saka',
              key: 'url',
              arrayIndex: 0
            }
          ],
          score: undefined
        }
      ];

      const searchString = 'saka';
      browser.tabs.query.returns(queryResults);
      expect(await tabSuggestions(searchString)).toEqual(expectedResult);
    });
  });

  afterAll(() => {
    browser.flush();
    delete global.browser;
  });
});
