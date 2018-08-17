import SuggestionList from '@/saka/Main/Components/SuggestionList/index.jsx';
import { render } from 'preact-testing-library';
import { h } from 'preact';

const MAX_SUGGESTIONS = 6;

describe('SuggestionList component ', () => {
  it('should be empty when no values provided', () => {
    const suggestions = [];

    const searchString = {};

    const { container } = render(
      <SuggestionList
        searchString={searchString}
        suggestions={suggestions}
        selectedIndex={0}
        firstVisibleIndex={0}
        maxSuggestions={5}
      />
    );

    const suggestionList = wrapper.find('.tab-suggestion');
    expect(suggestionList.length).toBe(0);
  });

  it('should display suggestions when provided', () => {
    const suggestions = [
      {
        type: 'tab',
        title: 'lusakasa/saka: Elegant tab search',
        url: 'https://github.com/lusakasa/saka'
      },
      {
        type: 'tab',
        title: 'Google',
        url: 'https://google.com'
      }
    ];

    const searchString = '';

    const SuggestionListRender = render(
      <SuggestionList
        searchString={searchString}
        suggestions={suggestions}
        selectedIndex={0}
        firstVisibleIndex={0}
        maxSuggestions={MAX_SUGGESTIONS}
        onSuggestionClick={() => {}}
      />
    );

    const suggestionList = SuggestionListRender.find('.tab-suggestion');
    expect(suggestionList.length).toBe(2);

    suggestions.map((suggestion, index) => {
      const renderedSuggestion = suggestionList.at(index).attrs();
      expect(renderedSuggestion.type).toBe(suggestion.type);
      expect(renderedSuggestion.title).toBe(suggestion.title);
      expect(renderedSuggestion.url).toBe(suggestion.url);
    });
  });
});
