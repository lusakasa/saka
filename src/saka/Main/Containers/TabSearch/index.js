import { Component, h } from 'preact';
import SearchBar from '../../Components/SearchBar';
import SuggestionList from '../../Components/SuggestionList';
import PaginationBar from '../../Components/PaginationBar';
import GUIContainer from '../../Components/GUIContainer';
import BackgroundImage from '../../Components/BackgroundImage';
import tabSuggestions from 'suggestions/tabs';
import recentTabSuggestions from 'suggestions/recentTabs';
import { preprocessSuggestion } from 'suggestions/preprocess';
import { ctrlKey } from 'lib/utils';
import { slowWheelEvent } from 'lib/dom';

export default class TabSearch extends Component {
  state = {
    searchString: '',
    suggestions: [],
    selectedIndex: 0,
    firstVisibleIndex: 0,
    maxSuggestions: 6,
    backgroundImage: undefined
  }
  render () {
    const { searchString, suggestions, selectedIndex, firstVisibleIndex, maxSuggestions } = this.state;
    const suggestion = suggestions[selectedIndex];
    // console.log('render suggestions', suggestions);
    return (
      <BackgroundImage suggestion={suggestion}>
        <GUIContainer onWheel={this.handleWheel}>
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
            firstVisibleIndex={firstVisibleIndex}
            maxSuggestions={maxSuggestions}
            onSuggestionClick={this.handleSuggestionClick}
          />
          <PaginationBar
            selectedIndex={selectedIndex}
            suggestions={suggestions}
            firstVisibleIndex={firstVisibleIndex}
            maxSuggestions={maxSuggestions}
            onClickPrevious={this.previousPage}
            onClickNext={this.nextPage}
          />
        </GUIContainer>
      </BackgroundImage>
    );
  }
  componentDidMount () {
    this.updateAutocompleteSuggestions('');
  }
  handleWheel = slowWheelEvent(50,
    (e) => { this.incrementSelectedIndex(1); },
    (e) => { this.incrementSelectedIndex(-1); }
  );
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
        if (ctrlKey(e)) {
          e.preventDefault();
          this.tryActivateTab(Number.parseInt(e.key) - 1);
        }
        break;
      case 'Enter':
        e.preventDefault();
        this.tryActivateTab();
        break;
      case 'k':
        if (ctrlKey(e)) {
          e.preventDefault();
          this.setState({ searchString: '' });
          this.updateAutocompleteSuggestions('');
        }
        break;
      case 's':
        if (ctrlKey(e)) {
          e.preventDefault();
          this.previousPage();
        }
        break;
      case 'd':
        if (ctrlKey(e)) {
          e.preventDefault();
          this.nextPage();
        }
        break;
    }
  }
  nextPage = () => {
    const { firstVisibleIndex, maxSuggestions, suggestions: { length: numSuggestions } } = this.state;
    const newFirstVisibleIndex = Math.max(0, Math.min(firstVisibleIndex + maxSuggestions, numSuggestions - maxSuggestions));
    
    // firstVisibleIndex + maxSuggestions >= numSuggestions
    //   ? Math.max(0, numSuggestions - maxSuggestions)
    //   : firstVisibleIndex + maxSuggestions;
    // if (firstVisibleIndex + maxSuggestions > numSuggestions) {
    //   newFirstIndex = Math.max(0, numSuggestions - maxSuggestions);
    //   selectedIndex = newFirstIndex;
    // } else {
    //   newFirstIndex = firstVisibleIndex + maxSuggestions;
    // }
    // jump as many slots as possible without overflowing
    this.setState({
      firstVisibleIndex: newFirstVisibleIndex,
      selectedIndex: 0
    });
  }
  previousPage = () => {
    const { firstVisibleIndex, maxSuggestions } = this.state;
    const newFirstVisibleIndex = Math.max(0, firstVisibleIndex - maxSuggestions);
    this.setState({
      firstVisibleIndex: newFirstVisibleIndex,
      selectedIndex: 0
    });
  }
  incrementSelectedIndex = (increment) => {
    const { selectedIndex } = this.state;
    this.trySetIndex(selectedIndex + increment);
  }
  trySetIndex = (index) => {
    if (this.indexInRange(index)) {
      this.setState({ selectedIndex: index });
    } else {
      const { firstVisibleIndex, maxSuggestions, suggestions } = this.state;
      if (index < 0 && firstVisibleIndex > 0) {
        this.setState({ firstVisibleIndex: firstVisibleIndex - 1 });
      } else if (index >= maxSuggestions && firstVisibleIndex + maxSuggestions < suggestions.length) {
        this.setState({ firstVisibleIndex: firstVisibleIndex + 1 });
      }
    }
  }
  indexInRange = (index) => {
    const { suggestions, maxSuggestions } = this.state;
    return index >= 0 && index <= Math.max(0, Math.min(suggestions.length, maxSuggestions) - 1);
  }
  tryActivateTab = async (index = this.state.selectedIndex) => {
    const { suggestions, firstVisibleIndex } = this.state;
    const suggestion = suggestions[firstVisibleIndex + index];
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
    const suggestions = searchStringAtLookup === ''
      ? await recentTabSuggestions()
      : await tabSuggestions(searchStringAtLookup);
    const { searchString: searchStringNow } = this.state;
    if (searchStringNow === searchStringAtLookup) {
      this.setState({
        suggestions: suggestions.map((suggestion) =>
          preprocessSuggestion(suggestion, searchStringAtLookup)),
        firstVisibleIndex: 0,
        selectedIndex: 0
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
