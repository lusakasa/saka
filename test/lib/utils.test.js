import * as libUtil from 'lib/utils';

describe('lib/util ', function() {
  describe('objectFromArray ', function() {
    it('should return empty object when empty list passed in', function() {
      expect(libUtil.objectFromArray([], 1)).toEqual({});
    });

    it('should return corresponding object when empty list passed in', function() {
      expect(
        libUtil.objectFromArray([{ hello: 'world', index: 0 }], 'index')
      ).toEqual({ 0: { hello: 'world', index: 0 } });
    });

    it('should return object with undefined key when target key not found', function() {
      expect(
        libUtil.objectFromArray([{ hello: 'world', index: 0 }], 'randomKey')
      ).toEqual({ undefined: { hello: 'world', index: 0 } });
    });
  });

  describe('rangedIncrement ', function() {
    it('should return min when sum(value, increment) < min', function() {
      expect(libUtil.rangedIncrement(1, 1, 3, 4)).toEqual(3);
    });

    it('should return sum(value, increment) when min < sum(value, increment) < max', function() {
      expect(libUtil.rangedIncrement(2, 2, 2, 5)).toEqual(4);
    });

    it('should return max when max < sum(value, increment)', function() {
      expect(libUtil.rangedIncrement(10, 10, 3, 8)).toEqual(8);
    });
  });

  describe('ctrlKey ', function() {
    it('should return metaKey when is mac', function() {
      const isMac = true;
      const kbEvent = new KeyboardEvent('ctrl');
      expect(libUtil.ctrlKey(kbEvent)).toEqual(kbEvent.metaKey);
    });

    it('should return ctrlKey when is not mac', function() {
      const isMac = false;
      const kbEvent = new KeyboardEvent('ctrl');
      expect(libUtil.ctrlKey(kbEvent)).toEqual(kbEvent.ctrlKey);
    });
  });
});
