import { Component, h } from 'preact';
import SearchBar from '../../Components/SearchBar';
import SuggestionList from '../../Components/SuggestionList';
import BackgroundImage from '../../Components/BackgroundImage';
import { tabSuggestions } from 'suggestions/get';
import { preprocessSuggestion } from 'suggestions/preprocess';
import { isMac } from 'lib/utils';

// background should change to selected tab
// chrome.tabs.captureVisibleTab

// if no input selected, show tabs in MRU order 

export default class TabSearch extends Component {
  state = {
    searchString: '',
    suggestions: [],
    selectedIndex: 0,
    maxSuggestions: 6,
    backgroundImage: undefined
  }
  render () {
    const { searchString, suggestions, selectedIndex } = this.state;
    const suggestion = suggestions[selectedIndex];
    return (
      <BackgroundImage suggestion={suggestion}>
        <main>
          <SearchBar
            searchString={searchString}
            suggestion={suggestion}
            icon={'tab'}
            onKeyDown={this.handleKeyDown}
            onInput={this.handleInput}
            onBlur={this.handleBlur}
            onButtonClick={this.handleButtonClick}
            onSuggestionClick={this.handleSuggestionClick}
          />
          <SuggestionList
            searchString={searchString}
            suggestions={suggestions}
            selectedIndex={selectedIndex}
            onSuggestionClick={this.handleSuggestionClick}
          />
        </main>
      </BackgroundImage>
    );
  }
  handleKeyDown = (e) => {
    switch (e.key) {
      case 'Escape':
        browser.runtime.sendMessage('closeSaka');
        break;
      case 'Backspace':
        if (!e.repeat && e.target.value === '') {
          browser.runtime.sendMessage('closeSaka');
        }
        break;
      case 'ArrowLeft':
      case 'ArrowRight':
        break;
      case 'ArrowDown':
      case 'ArrowUp':
        e.preventDefault();
        e.key === 'ArrowUp'
          ? this.incrementSelectedIndex(-1)
          : this.incrementSelectedIndex(1);
        break;
      case 'Tab':
        e.preventDefault();
        e.shiftKey
          ? this.incrementSelectedIndex(-1)
          : this.incrementSelectedIndex(1);
        break;
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
        if (isMac ? e.metaKey : e.ctrlKey) {
          e.preventDefault();
          this.tryActivateTab(Number.parseInt(e.key) - 1);
        }
        break;
      case 'Enter':
        e.preventDefault();
        this.tryActivateTab();
        break;
    }
  }
  incrementSelectedIndex = (increment) => {
    const { selectedIndex } = this.state;
    this.trySetIndex(selectedIndex + increment);
  }
  trySetIndex = (index) => {
    if (this.indexInRange(index)) {
      this.setState({ selectedIndex: index });
    }
  }
  indexInRange = (index) => {
    const { suggestions, maxSuggestions } = this.state;
    return index >= 0 && index <= Math.max(0, Math.min(suggestions.length, maxSuggestions) - 1);
  }
  tryActivateTab = async (index = this.state.selectedIndex) => {
    const { suggestions } = this.state;
    const suggestion = suggestions[index];
    console.log('attempted activation', index, suggestions, suggestion);
    if (suggestion) {
      await browser.tabs.update(suggestion.tabId, { active: true });
      await browser.windows.update(suggestion.windowId, { focused: true });
      await browser.runtime.sendMessage('closeSaka');
    }
  }
  handleInput = (e) => {
    const newSearchString = e.target.value;
    const { oldSearchString } = this.state;
    this.setState({ searchString: newSearchString });
    if (newSearchString !== oldSearchString) {
      this.setState({
        selectedIndex: 0,
        searchString: newSearchString
      });
      this.updateAutocompleteSuggestions(newSearchString);
    }
  }
  updateAutocompleteSuggestions = async (searchStringAtLookup) => {
    const suggestions = await tabSuggestions(searchStringAtLookup);
    const { searchString: searchStringNow } = this.state;
    if (searchStringNow === searchStringAtLookup) {
      this.setState({
        suggestions: suggestions.map((suggestion) =>
          preprocessSuggestion(suggestion, searchStringAtLookup))
      });
    }
  }
  handleBlur = (e) => {
    e.target.focus();
  }
  handleButtonClick = (e) => {
    this.tryActivateTab();
  }
  handleSuggestionClick = (index) => {
    this.tryActivateTab(index);
  }
}
