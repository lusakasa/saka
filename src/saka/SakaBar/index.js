import { Component, h } from 'preact';
import { getFastSuggestions, getSlowSuggestions } from '../suggestions';
import { preprocessSuggestion, cursorAtEnd } from '../utils';
import SearchBar from './SearchBar';
import SettingsBar from './SettingsBar';
import SuggestionList from './SuggestionList';
import ActionButton from './ActionButton';
import '@material/elevation/dist/mdc.elevation.min.css';
import './style.css';

// Make full-screen width, position at top an option

// Saka Bar should either (make this an option)
//   1. retain contents when hidden then reopened
//   2. contain current url highlighted
// Saka Bar should stay rendered even when the tab switches
// multiple tabs: 1. general search, 1.5  saved marks, 2. tabs, 3. bookmarks, 4. history, 5. possibly find, 6. current page search
// make tab order configurable
// make prefix string for each
// make commands for entering each
// Alt to enter
// Alt to switch between tab
// last Alt exits
// for tabs, possibly show screenshot on side
// Make it so that you can click and highlight text on the page AND automatically resize
// the Saka Bar. One or the other is easy, but not both.
// tab search should show square tile icons of all tabs allow users to navigate
// through them positionally, tiles can be arranged by domain/recency/position
// if by domain, allow skipping domain groups
// search bar lets users dynamically filter by text
// holding alt would show letters on every tile that when typed activate the tab
// let users select to disable number keys, instead have them be always on instant activate
// only autocomplete a search if the score is higher than a certain threshold
// (e.g. a searches score is never higher than this threshold unless its been searched in the past
// OR the searchText contains a . and the suggestion is a url)
// show fastest autocomplete results immediately, then update with results that take longer to fetch
// when Saka Bar pops up, show square tiles right below containing favicons of open tabs
// let the user navigate between tiles using tab/arrow keys, update the search bar with
// the text "Switch to: [title or url of tab]"
// group tiles by window (and also do window recency)

export default class SakaBar extends Component {
  state = {
    mode: 'tab',
    suggestions: [],
    selectedIndex: 0,
    maxSuggestions: 6,
    searchText: '',
    searchValue: '',
    lastAction: 'initialize',
    lastKeyPressed: undefined,
    tabURL: undefined
  }
  componentDidMount () {
    chrome.tabs.getCurrent((tab) => {
      this.setState({
        tabURL: tab.url,
        searchText: tab.url || '',
        lastAction: 'populateDefaultURL'
      });
    });
    document.onselectionchange = () => {
      this.setState({ lastAction: 'selectionchange' });
    };
  }
  render () {
    const { handleKeyDown, handleInput, handleClick } = this;
    const { searchText, suggestions, selectedIndex, lastAction, tabURL } = this.state;
    return (
      <main class='mdc-card mdc-elevation--z24 sakabar-container'>
        <section class='controls-container'>
          <SearchBar
            handleKeyDown={handleKeyDown}
            handleInput={handleInput}
            handleClick={handleClick}
            searchText={searchText}
            suggestion={suggestions[selectedIndex]}
            lastAction={lastAction}
          />
          <ActionButton
            tabURL={tabURL}
            searchText={searchText}
          />
        </section>
        <SuggestionList
          searchText={searchText}
          suggestions={suggestions}
          selectedIndex={selectedIndex}
        />
        <SettingsBar />
      </main>
    );
  }
  incrementSelectedIndex = () => {
    const { suggestions, maxSuggestions, selectedIndex } = this.state;
    const numSuggestions = Math.min(suggestions.length, maxSuggestions);
    const newIndex = selectedIndex === numSuggestions - 1
      ? selectedIndex
      : selectedIndex + 1;
    const newsearchText = suggestions[newIndex] && suggestions[newIndex].text || '';
    this.setState({
      selectedIndex: newIndex,
      searchText: newsearchText,
      lastAction: 'changeSelectedIndex'
    });
  }
  decrementSelectedIndex = () => {
    const { suggestions, selectedIndex } = this.state;
    const newIndex = selectedIndex === 0
      ? 0
      : selectedIndex - 1;
    const newsearchText = suggestions[newIndex] && suggestions[newIndex].text || '';
    this.setState({
      selectedIndex: newIndex,
      searchText: newsearchText,
      lastAction: 'changeSelectedIndex'
    });
  }
  handleKeyDown = (e) => {
    this.setState({ lastKeyPressed: e.key });
    switch (e.key) {
      case 'Escape':
        chrome.runtime.sendMessage('toggleSakaBar');
        break;
      case 'Backspace':
        if (!e.repeat && e.target.value === '') {
          chrome.runtime.sendMessage('toggleSakaBar');
        }
        this.setState({
          lastAction: 'backspace'
        });
        break;
      case 'ArrowDown':
        e.preventDefault();
        this.incrementSelectedIndex();
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.decrementSelectedIndex();
        break;
      case 'ArrowLeft':
      case 'ArrowRight':
        this.setState({
          searchText: e.target.value
        });
        break;
      case 'Tab':
        e.preventDefault();
        e.shiftKey
          ? this.decrementSelectedIndex()
          : this.incrementSelectedIndex();
        break;
      case 'Enter':
        e.preventDefault();
        chrome.tabs.getCurrent((tab) => {
          chrome.tabs.update(tab.id, {
            url: `https://www.google.com/search?q=${encodeURIComponent(this.autoComplete())}`
          });
        });
        break;
    }
  }
  updateAutocompleteSuggestions (cursorAtEndOfInput) {
    const searchTextAtLookup = this.state.searchText;
    getFastSuggestions(searchTextAtLookup)
      .then((suggestions) => {
        console.log('new suggestions', suggestions);
        if (this.state.searchText === searchTextAtLookup) {
          this.setState({
            suggestions: suggestions.map((suggestion) =>
              preprocessSuggestion(suggestion, searchTextAtLookup)),
            lastAction: cursorAtEndOfInput
          });
        }
      });
  }
  handleInput = (e) => {
    const { searchText, lastKeyPressed } = this.state;
    const newsearchText = e.target.value;
    console.log('on input updating from', searchText, 'to, ', newsearchText);
    if (newsearchText !== searchText) {
      this.setState({
        selectedIndex: 0,
        searchText: newsearchText,
        lastAction: 'input'
      });
      this.updateAutocompleteSuggestions(
        cursorAtEnd(e.target)
          ? 'newSuggestionsAndCursorAtEnd'
          : 'newSuggestions'
      );
    }
  }
}
