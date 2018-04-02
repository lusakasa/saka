import SuggestionList from '../SuggestionList';
import { render } from 'preact-render-spy';
import { h } from 'preact';

const MAX_SUGGESTIONS = 6;

describe('SuggestionList component ', function () {
  it('should be empty when no values provided', function () {
    let suggestions = [];

    let searchString = {};

    const wrapper = render(<SuggestionList searchString={searchString} suggestions={suggestions}
      selectedIndex={0} firstVisibleIndex={0} maxSuggestions={5} />);

    let suggestionList = wrapper.find('.tab-suggestion');
    expect(suggestionList.length).toBe(0);
  });

  it('should display suggestions when provided', function () {
    let suggestions = [
      {
        type: 'tab',
        title: 'lusakasa/saka: Elegant tab search',
        url: 'https://github.com/lusakasa/saka'
      },
      {
        type: 'tab',
        title: 'Google',
        url: 'https://google.com'
      }];

    let searchString = {};

    const SuggestionListRender = render(<SuggestionList searchString={searchString} suggestions={suggestions}
      selectedIndex={0} firstVisibleIndex={0} maxSuggestions={MAX_SUGGESTIONS} />);

    let suggestionList = SuggestionListRender.find('.tab-suggestion');
    expect(suggestionList.length).toBe(2);

    suggestions.map((suggestion, index) => {
      const renderedSuggestion = suggestionList.at(index).attrs();
      expect(renderedSuggestion.type).toBe(suggestion.type);
      expect(renderedSuggestion.title).toBe(suggestion.title);
      expect(renderedSuggestion.url).toBe(suggestion.url);
    });
  });
});
