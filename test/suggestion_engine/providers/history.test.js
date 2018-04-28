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
    it('should return all empty list when no browsing history', async () => {
      const queryResults = [];
      const expectedResult = [];

      const searchString = '';
      const sakaURL = 'nbdfpcokndmap/saka.html';
      browser.runtime.getURL.returns(sakaURL);
      browser.history.search.returns(queryResults);
      expect(await getHistorySuggestions(searchString)).toEqual(expectedResult);
    });

    it('should return all visited site history except Saka Options URL', async () => {
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
          lastVisitTime: 1524795334,
          score: 15
        }
      ];

      const searchString = '';
      const sakaURL = 'nbdfpcokndmap/saka.html';
      browser.runtime.getURL.returns(sakaURL);
      browser.history.search.returns(queryResults);
      expect(await getHistorySuggestions(searchString)).toEqual(expectedResult);
    });
  });

  afterAll(() => {
    browser.flush();
    delete global.browser;
  });
});
