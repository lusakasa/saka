import Suggestion from '../src/saka/Main/Components/SuggestionList/Components/Suggestion/index.js';
import { render } from 'preact-render-spy';
import { h } from 'preact';
// var t = require('../src/saka/Main/t');

describe('Suggestion component ', function () {
  describe('should display suggestion title when provided', function () {
    it('returns 5', function () {
      const wrapper = render(<Suggestion suggestion={'Suggestion Test'} />);
      expect(wrapper.find('span').contains('Suggestion Test')).toBeTruthy();
    });
  });
});
