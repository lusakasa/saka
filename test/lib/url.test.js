import * as libUrl from 'lib/url';

describe('lib/url ', function() {
  describe('isURL ', function() {
    it('should return false when URL is empty', function() {
      expect(libUrl.isURL('')).toBe(false);
      expect(libUrl.isURL(undefined)).toBe(false);
      expect(libUrl.isURL(null)).toBe(false);
    });

    it('should return false when URL is invalid', function() {
      let url = 'http:';

      expect(libUrl.isURL(url)).toBe(false);
    });

    it('should return true when URL is valid with standard protocol', function() {
      expect(libUrl.isURL('https://github.com/lusakasa/saka')).toBe(true);
      expect(libUrl.isURL('ftp://localhost')).toBe(true);
      expect(libUrl.isURL('file://home/testing')).toBe(true);
    });

    it('should return true when URL is valid with custom protocol', function() {
      expect(libUrl.isURL('about:blank')).toBe(true);
      expect(libUrl.isURL('chrome:addons')).toBe(true);
    });
  });

  describe('extractProtocol ', function() {
    it('should empty string when no protocol provided', function() {
      expect(libUrl.extractProtocol('this is a string with no protocol')).toBe(
        ''
      );
    });

    it('should return protocol when provided in a normal URL', function() {
      expect(libUrl.extractProtocol('https://github.com/lusakasa/saka')).toBe(
        'https:'
      );
    });

    it('should return protocol when provided URL with port', function() {
      expect(libUrl.extractProtocol('https://localhost:1234')).toBe('https:');
    });
  });

  describe('stripProtocol ', function() {
    it('should strip nothing when no protocol in string', function() {
      expect(libUrl.stripProtocol('string with no url')).toBe(
        'string with no url'
      );
    });

    it('should strip protocol when given a valid url', function() {
      expect(libUrl.stripProtocol('https://github.com/lusakasa/saka')).toBe(
        'github.com/lusakasa/saka'
      );
    });

    it('should strip protocol when given a valid url with ports', function() {
      expect(libUrl.stripProtocol('https://localhost:12345')).toBe(
        'localhost:12345'
      );
    });
  });

  describe('stripWWW ', function() {
    it('should strip nothing when no www in string', function() {
      expect(libUrl.stripWWW('https://github.com/lusakasa/saka')).toBe(
        'https://github.com/lusakasa/saka'
      );
    });

    it('should strip www when provided url with www', function() {
      expect(libUrl.stripWWW('www.github.com/lusakasa/saka')).toBe(
        'github.com/lusakasa/saka'
      );
    });

    it('should not strip www when provided url with protocol', function() {
      expect(libUrl.stripWWW('https://www.github.com/lusakasa/saka')).toBe(
        'https://www.github.com/lusakasa/saka'
      );
    });
  });

  describe('startsWithProtocol ', function() {
    it('should return false when does not start with a protocol', function() {
      expect(libUrl.startsWithProtocol('github.com/lusakasa/saka')).toBe(false);
    });

    it('should return false when does not start with a protocol and has a port', function() {
      expect(libUrl.startsWithProtocol('localhost:12345')).toBe(false);
    });

    it('should return true when does start with a protocol', function() {
      expect(
        libUrl.startsWithProtocol('https://github.com/lusakasa/saka')
      ).toBe(true);
    });

    it('should return true when does start with a protocol and has a port', function() {
      expect(libUrl.startsWithProtocol('https://localhost:12345')).toBe(true);
    });
  });

  describe('startsWithWWW ', function() {
    it('should return false when does not start with a www', function() {
      expect(libUrl.startsWithWWW('github.com/lusakasa/saka')).toBe(false);
    });

    it('should return false when does not start with a www and has a port', function() {
      expect(libUrl.startsWithWWW('myserver:12345')).toBe(false);
    });

    it('should return true when does start with a www', function() {
      expect(libUrl.startsWithWWW('www.github.com/lusakasa/saka')).toBe(true);
    });

    it('should return true when does start with a www and has a port', function() {
      expect(libUrl.startsWithWWW('www.myserver:12345')).toBe(true);
    });
  });

  describe('isTLD ', function() {
    it('should return false when not given a valid tld', function() {
      expect(libUrl.isTLD('faketld.test')).toBe(false);
    });

    it('should return true when given a valid tld', function() {
      expect(libUrl.isTLD('com')).toBe(true);
    });
  });

  describe('isProtocol ', function() {
    it('should return false when not given a valid protocol', function() {
      expect(libUrl.isProtocol('fakeprotocol:')).toBe(false);
    });

    it('should return true when given a valid protocol', function() {
      expect(libUrl.isProtocol('https:')).toBe(true);
    });
  });

  describe('isLikeURL ', function() {
    it('should return false when not given a url like string', function() {
      expect(libUrl.isLikeURL('nonurlstring')).toBe(false);
    });

    it('should return true when given a url like string', function() {
      expect(libUrl.isLikeURL('https://github.com/lusakasa/saka')).toBe(true);
    });

    it('should return true when given an ip address', function() {
      expect(libUrl.isLikeURL('127.0.0.1')).toBe(true);
    });
  });

  describe('prettifyURL ', function() {
    it('should return empty string when input empty string', function() {
      expect(libUrl.prettifyURL('', '')).toBe('');
    });

    it('should return prettified string when input prettified url', function() {
      expect(libUrl.prettifyURL('github.com/lusakasa/saka', '')).toBe(
        'github.com/lusakasa/saka'
      );
    });

    it('should return prettified string when input url', function() {
      expect(libUrl.prettifyURL('http://github.com/lusakasa/saka/', '')).toBe(
        'github.com/lusakasa/saka'
      );
    });
  });
});
