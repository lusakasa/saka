const browser = require('sinon-chrome/webextensions');
import bookmarkSuggestions from 'suggestion_engine/server/providers/bookmark.js';

describe('server/providers/bookmark ', function() {
  beforeAll(function() {
    global.browser = browser;
  });

  beforeEach(function() {
    browser.flush();
  });

  describe('bookmarkSuggestions ', function() {
    it('should return all valid bookmarks when search string is empty', async function() {
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
      expect(await bookmarkSuggestions(searchString)).toEqual(expectedResult);
    });

    it('should filter all bookmarks with unknown protocol', async function() {
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
      expect(await bookmarkSuggestions(searchString)).toEqual(expectedResult);
    });

    it('should filter all bookmarks with invalid URL', async function() {
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
      expect(await bookmarkSuggestions(searchString)).toEqual(expectedResult);
    });
  });

  afterAll(function() {
    browser.flush();
    delete global.browser;
  });
});
