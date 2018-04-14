const browser = require('sinon-chrome/webextensions');
import tabSuggestions from 'suggestion_engine/server/providers/tab.js';

describe('server/providers/tab ', function() {
  beforeAll(function() {
    global.browser = browser;
  });

  beforeEach(function() {
    browser.flush();
  });

  describe('tabSuggestions ', function() {
    it('should return all recent tabs when search string is empty', async function() {
      const queryResults = [
        {
          id: 1,
          windowId: 0,
          title: 'Google',
          url: 'https://google.com',
          favIconUrl: 'https://google.com/icon.png'
        },
        {
          id: 0,
          windowId: 0,
          title: 'Saka',
          url: 'https://github.com/lusakasa/saka',
          favIconUrl: 'https://github.com/lusakasa/saka/icon.png'
        }
      ];

      const tabHistory = {
        tabHistory: [
          {
            type: 'tab',
            tabId: 1,
            windowId: 0,
            title: 'Google',
            url: 'https://google.com',
            favIconUrl: 'https://google.com/icon.png'
          }
        ]
      };

      const expectedResult = [
        undefined,
        {
          type: 'tab',
          tabId: 0,
          windowId: 0,
          title: 'Saka',
          url: 'https://github.com/lusakasa/saka',
          favIconUrl: 'https://github.com/lusakasa/saka/icon.png'
        },
        {
          type: 'tab',
          tabId: 1,
          windowId: 0,
          title: 'Google',
          url: 'https://google.com',
          favIconUrl: 'https://google.com/icon.png'
        }
      ];

      const searchString = '';
      browser.tabs.query.returns(queryResults);
      browser.runtime.getBackgroundPage.returns(tabHistory);
      expect(await tabSuggestions(searchString)).toEqual(expectedResult);
    });

    it('should return all tabs matching searchString', async function() {
      const queryResults = [
        {
          id: 0,
          windowId: 0,
          title: 'Saka',
          url: 'https://github.com/lusakasa/saka',
          favIconUrl: 'https://github.com/lusakasa/saka/icon.png'
        },
        {
          id: 0,
          windowId: 0,
          title: 'Google',
          url: 'https://google.com',
          favIconUrl: 'https://google.com/icon.png'
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

  afterAll(function() {
    browser.flush();
    delete global.browser;
  });
});
