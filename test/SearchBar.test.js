import SearchBar from 'src/saka/Main/Components/SearchBar/index.jsx';
import { render } from 'preact-render-spy';
import { h } from 'preact';

describe('SearchBar component ', () => {
  it('should be empty when no there is no search string provided', () => {
    const props = {
      placeholder: 'Tabs',
      searchString: '',
      suggestion: {},
      mode: 'tab',
      onKeyDown() {},
      onInput() {},
      onBlur() {},
      onButtonClick() {}
    };

    const searchBarRender = render(<SearchBar {...props} />);
    const searchInput = searchBarRender.find('#search-bar');

    expect(searchInput.attr('value')).toBe('');
    expect(searchInput.attr('placeholder')).toBe('Tabs');
  });

  it('should show the search string when search string is provided', () => {
    const props = {
      placeholder: 'Tabs',
      searchString: 'Saka github',
      suggestion: {},
      mode: 'tab',
      onKeyDown() {},
      onInput() {},
      onBlur() {},
      onButtonClick() {}
    };

    const searchBarRender = render(<SearchBar {...props} />);
    const searchInput = searchBarRender.find('#search-bar');

    expect(searchInput.attr('value')).toBe('Saka github');
  });
});
