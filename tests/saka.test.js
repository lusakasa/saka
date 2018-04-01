import SuggestionList from '../src/saka/Main/Components/SuggestionList/index';
import { render } from 'preact-render-spy';
import { h } from 'preact';

describe('SuggestionList component ', function () {
  it('should be empty when no values provided', function () {
    let suggestions = [];

    let searchString = {};

    const wrapper = render(<SuggestionList searchString={searchString} suggestions={suggestions}
      selectedIndex={0} firstVisibleIndex={0} maxSuggestions={5} />);

    let suggestionList = wrapper.find('.tab-suggestion');
    expect(suggestionList.length).toBe(0);
  });

  it('should display suggestion title when provided', function () {
    let suggestions = [
      {
        type: 'tab',
        title: 'lusakasa/saka: Elegant tab search',
        url: 'https://github.com/lusakasa/saka',
        prettyURL: 'Saka'
      },
      {
        type: 'tab',
        title: 'Google',
        url: 'https://google.com',
        prettyURL: 'Google'
      }];

    let searchString = {};

    const SuggestionListRender = render(<SuggestionList searchString={searchString} suggestions={suggestions}
      selectedIndex={0} firstVisibleIndex={0} maxSuggestions={5} />);

    let suggestionList = SuggestionListRender.find('.tab-suggestion');
    expect(suggestionList.length).toBe(2);

    suggestions.map((suggestion, index) => {
      const renderedSuggestion = suggestionList.at(index).attrs();
      expect(renderedSuggestion.title).toBe(suggestion.title);
      expect(renderedSuggestion.url).toBe(suggestion.url);
    });
  });
});
