import SearchBar from '../SearchBar';
import { render } from 'preact-render-spy';
import { h } from 'preact';

describe('SearchBar component ', function () {
  // it('should be empty when no there is no search string provided', function () {
  //   const props = {
  //     placeholder: 'Tabs',
  //     searchString: '',
  //     suggestion: {},
  //     mode: 'tab',
  //     onKeyDown: function () {},
  //     onInput: function () {},
  //     onBlur: function () {},
  //     onButtonClick: function () {}};

  //   const searchBarRender = render(<SearchBar {...props} />);

  //   const searchInput = searchBarRender.find('#search-bar');
  //   const searchButton = searchBarRender.find('#action-button');
  //   const searchButtonIcon = searchButton.children().at(0).children();

  //   expect(searchInput.attr('value')).toBe('');
  //   expect(searchInput.attr('placeholder')).toBe('Tabs');
  //   expect(searchButtonIcon.text()).toBe('tab');
  // });

  it('should show the search string when search string is provided', function () {
    const props = {
      placeholder: 'Tabs',
      searchString: 'Saka github',
      suggestion: {},
      mode: 'tab',
      onKeyDown: function () {},
      onInput: function () {},
      onBlur: function () {},
      onButtonClick: function () {}
    };

    const searchBarRender = render(<SearchBar {...props} />);

    const searchInput = searchBarRender.find('#search-bar');
    const searchButton = searchBarRender.find('#action-button');
    const searchButtonIcon = searchButton.children().at(0).children();

    expect(searchInput.attr('value')).toBe('Saka github');
    expect(searchButtonIcon.text()).toBe('tab');
  });
});
