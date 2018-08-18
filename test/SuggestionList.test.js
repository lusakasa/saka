import SuggestionList from '@/saka/Main/Components/SuggestionList/index.jsx';
import { render } from 'preact-testing-library';
import { h } from 'preact';

const MAX_SUGGESTIONS = 6;

beforeEach(() => {
  // Clears the database and adds some testing data.
  // Jest will wait for this promise to resolve before running tests.
  global.SAKA_PLATFORM = 'chrome';
});

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
        maxSuggestions={MAX_SUGGESTIONS}
      />
    );

    expect(container).toMatchSnapshot();
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

    const { getByText } = render(
      <SuggestionList
        searchString={searchString}
        suggestions={suggestions}
        selectedIndex={0}
        firstVisibleIndex={0}
        maxSuggestions={MAX_SUGGESTIONS}
        onSuggestionClick={() => {}}
      />
    );

    suggestions.map(suggestion => {
      getByText(suggestion.title);
      getByText(suggestion.url);
    });
  });
});
