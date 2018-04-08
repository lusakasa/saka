import * as tabProvider from 'suggestion_engine/server/providers/tab.js';

describe('server/providers/tab ', function() {
  describe('allTabSuggestions ', function() {
    it('should return all tabs', function() {
      expect(tabProvider.allTabSuggestions()).toBe(false);
    });
  });
});
