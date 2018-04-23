const browser = require('sinon-chrome/webextensions');

import * as libUrl from 'lib/url';

describe('lib/url ', () => {
  beforeAll(() => {
    global.browser = browser;
  });

  beforeEach(() => {
    browser.flush();
  });

  describe('isURL ', () => {
    it('should return false when URL is empty', () => {
      expect(libUrl.isURL('')).toBe(false);
      expect(libUrl.isURL(undefined)).toBe(false);
      expect(libUrl.isURL(null)).toBe(false);
    });

    it('should return false when URL is invalid', () => {
      const url = 'http:';

      expect(libUrl.isURL(url)).toBe(false);
    });

    it('should return true when URL is valid with standard protocol', () => {
      expect(libUrl.isURL('https://github.com/lusakasa/saka')).toBe(true);
      expect(libUrl.isURL('ftp://localhost')).toBe(true);
      expect(libUrl.isURL('file://home/testing')).toBe(true);
    });

    it('should return true when URL is valid with custom protocol', () => {
      expect(libUrl.isURL('about:blank')).toBe(true);
      expect(libUrl.isURL('chrome:addons')).toBe(true);
    });
  });

  describe('extractProtocol ', () => {
    it('should empty string when no protocol provided', () => {
      expect(libUrl.extractProtocol('this is a string with no protocol')).toBe(
        ''
      );
    });

    it('should return protocol when provided in a normal URL', () => {
      expect(libUrl.extractProtocol('https://github.com/lusakasa/saka')).toBe(
        'https:'
      );
    });

    it('should return protocol when provided URL with port', () => {
      expect(libUrl.extractProtocol('https://localhost:1234')).toBe('https:');
    });
  });

  describe('stripProtocol ', () => {
    it('should strip nothing when no protocol in string', () => {
      expect(libUrl.stripProtocol('string with no url')).toBe(
        'string with no url'
      );
    });

    it('should strip protocol when given a valid url', () => {
      expect(libUrl.stripProtocol('https://github.com/lusakasa/saka')).toBe(
        'github.com/lusakasa/saka'
      );
    });

    it('should strip protocol when given a valid url with ports', () => {
      expect(libUrl.stripProtocol('https://localhost:12345')).toBe(
        'localhost:12345'
      );
    });
  });

  describe('stripWWW ', () => {
    it('should strip nothing when no www in string', () => {
      expect(libUrl.stripWWW('https://github.com/lusakasa/saka')).toBe(
        'https://github.com/lusakasa/saka'
      );
    });

    it('should strip www when provided url with www', () => {
      expect(libUrl.stripWWW('www.github.com/lusakasa/saka')).toBe(
        'github.com/lusakasa/saka'
      );
    });

    it('should not strip www when provided url with protocol', () => {
      expect(libUrl.stripWWW('https://www.github.com/lusakasa/saka')).toBe(
        'https://www.github.com/lusakasa/saka'
      );
    });
  });

  describe('startsWithProtocol ', () => {
    it('should return false when does not start with a protocol', () => {
      expect(libUrl.startsWithProtocol('github.com/lusakasa/saka')).toBe(false);
    });

    it('should return false when does not start with a protocol and has a port', () => {
      expect(libUrl.startsWithProtocol('localhost:12345')).toBe(false);
    });

    it('should return true when does start with a protocol', () => {
      expect(
        libUrl.startsWithProtocol('https://github.com/lusakasa/saka')
      ).toBe(true);
    });

    it('should return true when does start with a protocol and has a port', () => {
      expect(libUrl.startsWithProtocol('https://localhost:12345')).toBe(true);
    });
  });

  describe('startsWithWWW ', () => {
    it('should return false when does not start with a www', () => {
      expect(libUrl.startsWithWWW('github.com/lusakasa/saka')).toBe(false);
    });

    it('should return false when does not start with a www and has a port', () => {
      expect(libUrl.startsWithWWW('myserver:12345')).toBe(false);
    });

    it('should return true when does start with a www', () => {
      expect(libUrl.startsWithWWW('www.github.com/lusakasa/saka')).toBe(true);
    });

    it('should return true when does start with a www and has a port', () => {
      expect(libUrl.startsWithWWW('www.myserver:12345')).toBe(true);
    });
  });

  describe('isTLD ', () => {
    it('should return false when not given a valid tld', () => {
      expect(libUrl.isTLD('faketld.test')).toBe(false);
    });

    it('should return true when given a valid tld', () => {
      expect(libUrl.isTLD('com')).toBe(true);
    });
  });

  describe('isProtocol ', () => {
    it('should return false when not given a valid protocol', () => {
      expect(libUrl.isProtocol('fakeprotocol:')).toBe(false);
    });

    it('should return true when given a valid protocol', () => {
      expect(libUrl.isProtocol('https:')).toBe(true);
    });
  });

  describe('isLikeURL ', () => {
    it('should return false when not given a url like string', () => {
      expect(libUrl.isLikeURL('nonurlstring')).toBe(false);
    });

    it('should return true when given a url like string', () => {
      expect(libUrl.isLikeURL('https://github.com/lusakasa/saka')).toBe(true);
    });

    it('should return true when given an ip address', () => {
      expect(libUrl.isLikeURL('127.0.0.1')).toBe(true);
    });
  });

  describe('prettifyURL ', () => {
    it('should return empty string when input empty string', () => {
      expect(libUrl.prettifyURL('', '')).toBe('');
    });

    it('should return prettified string when input prettified url', () => {
      expect(libUrl.prettifyURL('github.com/lusakasa/saka', '')).toBe(
        'github.com/lusakasa/saka'
      );
    });

    it('should return prettified string when input url', () => {
      expect(libUrl.prettifyURL('http://github.com/lusakasa/saka/', '')).toBe(
        'github.com/lusakasa/saka'
      );
    });
  });

  describe('isSakaUrl ', () => {
    it('should return false when URL is empty', async () => {
      const sakaId = 'abcdefg/saka.html';
      browser.runtime.getURL.returns(sakaId);

      expect(await libUrl.isSakaUrl()).toBe(false);
    });

    it('should return false when URL does not contain saka ID', async () => {
      const sakaId = 'abcdefg/saka.html';
      browser.runtime.getURL.returns(sakaId);

      expect(await libUrl.isSakaUrl('https://github.com/lusakasa')).toBe(false);
    });

    it('should return true when URL contains saka ID', async () => {
      const sakaId = 'abcdefg/saka.html';
      browser.runtime.getURL.returns(sakaId);

      expect(await libUrl.isSakaUrl('http://abcdefg/saka.html')).toBe(true);
    });
  });

  afterAll(() => {
    browser.flush();
    delete global.browser;
  });
});
