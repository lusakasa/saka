const browser = require('sinon-chrome/webextensions');

import getHistorySuggestions from 'suggestion_engine/server/providers/history.js';

describe('server/providers/history ', () => {
  beforeAll(() => {
    global.browser = browser;
  });

  beforeEach(() => {
    browser.flush();
  });

  describe('getHistorySuggestions ', () => {
    it('should not use fuzzy search when enableFuzzySearch setting is set to false', async () => {
      const settingsStore = {
        sakaSettings: {
          enableFuzzySearch: false
        }
      };
      const queryResults = [
        {
          id: 1,
          url: 'https://github.com/lusakasa/saka',
          title: 'Saka Github',
          lastVisitTime: 1524795334,
          visitCount: 5,
          typedCount: 10
        },
        {
          id: 2,
          url: 'https://example.com',
          title: 'Example',
          lastVisitTime: 1524794200,
          visitCount: 1,
          typedCount: 0
        }
      ];
      const expectedResult = [
        {
          type: 'history',
          url: 'https://github.com/lusakasa/saka',
          title: 'Saka Github',
          lastAccessed: 1524795334,
          score: 15
        },
        {
          type: 'history',
          title: 'Example',
          url: 'https://example.com',
          lastAccessed: 1524794200,
          score: 1
        }
      ];

      const searchString = 'Saka';
      const sakaURL = 'nbdfpcokndmap/saka.html';
      browser.runtime.getURL.returns(sakaURL);
      browser.history.search.returns(queryResults);
      browser.storage.sync.get.returns(settingsStore);
      expect(await getHistorySuggestions(searchString)).toEqual(expectedResult);
    });

    it('should use fuzzy search when enableFuzzySearch setting is set to true', async () => {
      const settingsStore = {
        sakaSettings: {
          enableFuzzySearch: true
        }
      };
      const queryResults = [
        {
          id: 1,
          url: 'https://github.com/lusakasa/saka',
          title: 'Saka Github',
          lastVisitTime: 1524795334,
          visitCount: 5,
          typedCount: 10
        },
        {
          id: 2,
          url: 'https://example.com',
          title: 'Example',
          lastVisitTime: 1524794200,
          visitCount: 1,
          typedCount: 0
        }
      ];
      const expectedResult = [
        {
          type: 'history',
          url: 'https://github.com/lusakasa/saka',
          title: 'Saka Github',
          lastAccessed: 1524795334,
          score: undefined,
          matches: [
            {
              indices: [[0, 3]],
              value: 'Saka Github',
              key: 'title',
              arrayIndex: 0
            },
            {
              indices: [[4, 4], [21, 24]],
              value: 'https://github.com/lusakasa/saka',
              key: 'url',
              arrayIndex: 0
            }
          ]
        },
        {
          type: 'history',
          title: 'Example',
          url: 'https://example.com',
          lastAccessed: 1524794200,
          score: undefined,
          matches: [
            {
              indices: [[2, 2]],
              value: 'Example',
              key: 'title',
              arrayIndex: 0
            },
            {
              indices: [[4, 4], [10, 10]],
              value: 'https://example.com',
              key: 'url',
              arrayIndex: 0
            }
          ]
        }
      ];

      const searchString = 'Saka';
      const sakaURL = 'nbdfpcokndmap/saka.html';
      browser.runtime.getURL.returns(sakaURL);
      browser.history.search.returns(queryResults);
      browser.storage.sync.get.returns(settingsStore);
      expect(await getHistorySuggestions(searchString)).toEqual(expectedResult);
    });

    it('should return all visited site history except Saka Options URL', async () => {
      const settingsStore = {
        sakaSettings: {
          enableFuzzySearch: true
        }
      };
      const queryResults = [
        {
          id: 1,
          url: 'https://github.com/lusakasa/saka',
          title: 'Saka Github',
          lastVisitTime: 1524795334,
          visitCount: 5,
          typedCount: 10
        },
        {
          id: 2,
          url: 'chrome://nbdfpcokndmap/options.html',
          title: 'Options',
          lastVisitTime: 1524794200,
          visitCount: 1,
          typedCount: 0
        }
      ];
      const expectedResult = [
        {
          type: 'history',
          url: 'https://github.com/lusakasa/saka',
          title: 'Saka Github',
          lastAccessed: 1524795334,
          score: 15
        }
      ];

      const searchString = '';
      const sakaURL = 'nbdfpcokndmap/saka.html';
      browser.runtime.getURL.returns(sakaURL);
      browser.history.search.returns(queryResults);
      browser.storage.sync.get.returns(settingsStore);
      expect(await getHistorySuggestions(searchString)).toEqual(expectedResult);
    });
  });

  afterAll(() => {
    browser.flush();
    delete global.browser;
  });
});
