import Suggestion from '../src/saka/Main/Components/SuggestionList/Components/Suggestion/index.js';
import Enzyme, { mount } from 'enzyme';
import { h } from 'preact';
// var t = require('../src/saka/Main/t');

describe('background specs', function () {
  describe('When five is called', function () {
    it('returns 5', function () {
      // let calc = new Calculator();
      const wrapper = mount(<Suggestion />);
      expect(5).toBe(5);
    });
  });
});
