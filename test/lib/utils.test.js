import * as libUtil from 'lib/utils';

describe('lib/util ', () => {
  describe('objectFromArray ', () => {
    it('should return empty object when empty list passed in', () => {
      expect(libUtil.objectFromArray([], 1)).toEqual({});
    });

    it('should return corresponding object when empty list passed in', () => {
      expect(
        libUtil.objectFromArray([{ hello: 'world', index: 0 }], 'index')
      ).toEqual({ 0: { hello: 'world', index: 0 } });
    });

    it('should return object with undefined key when target key not found', () => {
      expect(
        libUtil.objectFromArray([{ hello: 'world', index: 0 }], 'randomKey')
      ).toEqual({ undefined: { hello: 'world', index: 0 } });
    });
  });

  describe('rangedIncrement ', () => {
    it('should return min when sum(value, increment) < min', () => {
      expect(libUtil.rangedIncrement(1, 1, 3, 4)).toEqual(3);
    });

    it('should return sum(value, increment) when min < sum(value, increment) < max', () => {
      expect(libUtil.rangedIncrement(2, 2, 2, 5)).toEqual(4);
    });

    it('should return max when max < sum(value, increment)', () => {
      expect(libUtil.rangedIncrement(10, 10, 3, 8)).toEqual(8);
    });
  });

  describe('ctrlKey ', () => {
    it('should return metaKey when is mac', () => {
      const isMac = true;
      const kbEvent = new KeyboardEvent('ctrl');
      expect(libUtil.ctrlKey(kbEvent)).toEqual(kbEvent.metaKey);
    });

    it('should return ctrlKey when is not mac', () => {
      const isMac = false;
      const kbEvent = new KeyboardEvent('ctrl');
      expect(libUtil.ctrlKey(kbEvent)).toEqual(kbEvent.ctrlKey);
    });
  });

  describe('getFilteredSuggestions ', () => {
    it('should only return valid matches to search string', async () => {
      const searchString = 'hello';
      const getSuggestions = function() {
        return [
          {
            title: 'Hello',
            url: 'http://www.hello.com'
          },
          {
            title: 'testing saka',
            url: 'http://www.saka.io'
          }
        ];
      };

      const expectedResults = [
        {
          title: 'Hello',
          url: 'http://www.hello.com',
          score: undefined,
          matches: [
            {
              indices: [[0, 4]],
              value: 'Hello',
              key: 'title',
              arrayIndex: 0
            },
            {
              indices: [[0, 0], [11, 15]],
              value: 'http://www.hello.com',
              key: 'url',
              arrayIndex: 0
            }
          ]
        }
      ];

      const results = await libUtil.getFilteredSuggestions(searchString, {
        getSuggestions,
        threshold: 0.6,
        keys: ['title', 'url']
      });
      expect(results).toEqual(expectedResults);
    });
  });
});
