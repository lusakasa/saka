const browser = require('sinon-chrome/webextensions');

import bookmarkSuggestions from 'suggestion_engine/server/providers/bookmark.js';

describe('server/providers/bookmark ', () => {
  beforeAll(() => {
    global.browser = browser;
  });

  beforeEach(() => {
    browser.flush();
  });

  describe('bookmarkSuggestions ', () => {
    it('should return all valid bookmarks when search string is empty', async () => {
      const settingsStore = {
        sakaSettings: {
          enableFuzzySearch: true
        }
      };

      const queryResults = [
        {
          url: 'https://google.com',
          title: 'Google',
          dateAdded: '2018-01-01'
        },
        {
          url: 'https://github.com/lusakasa/saka',
          title: 'Saka',
          dateAdded: '2018-02-01'
        }
      ];

      const expectedResult = [
        {
          type: 'bookmark',
          score: -1,
          url: 'https://google.com',
          title: 'Google'
        },
        {
          type: 'bookmark',
          score: -1,
          url: 'https://github.com/lusakasa/saka',
          title: 'Saka'
        }
      ];

      const searchString = '';
      browser.bookmarks.search.returns(queryResults);
      browser.storage.sync.get.returns(settingsStore);
      expect(await bookmarkSuggestions(searchString)).toEqual(expectedResult);
    });

    it('should filter all bookmarks with unknown protocol', async () => {
      const settingsStore = {
        sakaSettings: {
          enableFuzzySearch: true
        }
      };

      const queryResults = [
        {
          url: 'ssh://myhost.net',
          title: 'My Site',
          dateAdded: '2018-01-01'
        },
        {
          url: 'https://github.com/lusakasa/saka',
          title: 'Saka',
          dateAdded: '2018-02-01'
        }
      ];

      const expectedResult = [
        {
          type: 'bookmark',
          score: -1,
          url: 'https://github.com/lusakasa/saka',
          title: 'Saka'
        }
      ];

      const searchString = '';
      browser.bookmarks.search.returns(queryResults);
      browser.storage.sync.get.returns(settingsStore);
      expect(await bookmarkSuggestions(searchString)).toEqual(expectedResult);
    });

    it('should filter all bookmarks with invalid URL', async () => {
      const settingsStore = {
        sakaSettings: {
          enableFuzzySearch: true
        }
      };

      const queryResults = [
        {
          url: 'myhostnet',
          title: 'My Site',
          dateAdded: '2018-01-01'
        },
        {
          url: 'https://github.com/lusakasa/saka',
          title: 'Saka',
          dateAdded: '2018-02-01'
        }
      ];

      const expectedResult = [
        {
          type: 'bookmark',
          score: -1,
          url: 'https://github.com/lusakasa/saka',
          title: 'Saka'
        }
      ];

      const searchString = '';
      browser.bookmarks.search.returns(queryResults);
      browser.storage.sync.get.returns(settingsStore);
      expect(await bookmarkSuggestions(searchString)).toEqual(expectedResult);
    });

    it('should return fuzzy search matching results', async () => {
      const settingsStore = {
        sakaSettings: {
          enableFuzzySearch: true
        }
      };

      const queryResults = [
        {
          url: 'myhostnet',
          title: 'My Site',
          dateAdded: '2018-01-01'
        },
        {
          url: 'https://github.com/lusakasa/saka',
          title: 'Saka',
          dateAdded: '2018-02-01'
        }
      ];

      const expectedResult = [
        {
          type: 'bookmark',
          url: 'https://github.com/lusakasa/saka',
          title: 'Saka',
          score: undefined,
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
          ]
        }
      ];

      const searchString = 'Saka';
      browser.bookmarks.search.returns(queryResults);
      browser.storage.sync.get.returns(settingsStore);
      expect(await bookmarkSuggestions(searchString)).toEqual(expectedResult);
    });
  });

  afterAll(() => {
    browser.flush();
    delete global.browser;
  });
});
