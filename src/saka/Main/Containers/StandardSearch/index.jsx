import { Component, h } from 'preact';
import {
  getSuggestions,
  activateSuggestion,
  closeTab
} from 'suggestion_engine/client/index.js';
import { preprocessSuggestion } from 'suggestion_utils/index.js';
import { ctrlKey } from 'lib/utils.js';
import { slowWheelEvent } from 'lib/dom.js';
import SearchBar from '../../Components/SearchBar/index.jsx';
import SuggestionList from '../../Components/SuggestionList/index.jsx';
import PaginationBar from '../../Components/PaginationBar/index.jsx';
import GUIContainer from '../../Components/GUIContainer/index.jsx';
import BackgroundImage from '../../Components/BackgroundImage/index.jsx';
import ModeSwitcher from '../../Components/ModeSwitcher/index.jsx';

// provides suggestions but doesn't autocomplete input

export default class extends Component {
  state = {
    searchString: '',
    suggestions: [],
    selectedIndex: 0, // 0 <= selectedIndex < maxSuggestions
    firstVisibleIndex: 0, // 0 <= firstVisibleIndex < suggestion.length
    maxSuggestions: 6,
    undoIndex: this.props.searchHistory.size - 1
  };

  componentDidMount() {
    this.updateAutocompleteSuggestions('').then(() => {
      const { suggestions } = this.state;
      if (suggestions.length > 1) {
        this.setState({
          selectedIndex: 1
        });
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.mode !== prevProps.mode) {
      this.updateAutocompleteSuggestions(this.state.searchString);
    }
  }

  getPreviousSearchString = () => {
    if (this.state.undoIndex !== 0) {
      this.setState({
        searchString: [...this.props.searchHistory][this.state.undoIndex],
        undoIndex: this.state.undoIndex - 1
      });
      this.updateAutocompleteSuggestions(this.state.searchString);
    }
  };

  getNextSearchString = () => {
    if (this.state.undoIndex < this.props.searchHistory.size) {
      this.setState({
        searchString: [...this.props.searchHistory][this.state.undoIndex],
        undoIndex: this.state.undoIndex + 1
      });
      this.updateAutocompleteSuggestions(this.state.searchString);
    }
  };

  handleWheel = slowWheelEvent(
    50,
    () => {
      this.incrementSelectedIndex(1);
    },
    () => {
      this.incrementSelectedIndex(-1);
    }
  );

  handleKeyDown = e => {
    switch (e.key) {
      case 'Escape':
        browser.runtime.sendMessage({
          key: 'closeSaka',
          searchHistory: [...this.props.searchHistory]
        });
        break;
      case 'Backspace':
        if (ctrlKey(e)) {
          e.preventDefault();
          this.closeTab();
        } else if (!e.repeat && e.target.value === '') {
          browser.runtime.sendMessage({
            key: 'closeSaka',
            searchHistory: [...this.props.searchHistory]
          });
        }
        break;
      case 'ArrowLeft':
      case 'ArrowRight':
        break;
      case 'ArrowDown':
        e.preventDefault();
        this.props.updateSearchHistory(this.state.searchString);
        this.incrementSelectedIndex(1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.props.updateSearchHistory(this.state.searchString);
        this.incrementSelectedIndex(-1);
        break;
      case 'Tab':
        e.preventDefault();
        this.props.updateSearchHistory(this.state.searchString);
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
          this.tryActivateSuggestion(Number.parseInt(10, e.key) - 1);
        }
        break;
      case 'Enter':
        e.preventDefault();
        this.props.updateSearchHistory(
          this.state.searchString,
          this.tryActivateSuggestion
        );
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
      case ' ':
        if (e.shiftKey || this.state.searchString === '') {
          e.preventDefault();
          this.props.shuffleMode();
        }
        break;
      case 'A':
        if (ctrlKey(e)) {
          e.preventDefault();
          this.props.setMode('tab');
        }
        break;
      case 'C':
        if (ctrlKey(e)) {
          e.preventDefault();
          this.props.setMode('closedTab');
        }
        break;
      case 'M':
        if (ctrlKey(e)) {
          e.preventDefault();
          this.props.setMode('mode');
        }
        break;
      case 'b':
        if (ctrlKey(e)) {
          e.preventDefault();
          this.props.setMode('bookmark');
        }
        break;
      case 'E':
        if (ctrlKey(e)) {
          e.preventDefault();
          this.props.setMode('history');
        }
        break;
      case 'z':
        if (ctrlKey(e)) {
          e.preventDefault();
          this.getPreviousSearchString();
        }
        break;
      case 'y':
        if (ctrlKey(e)) {
          e.preventDefault();
          this.getNextSearchString();
        }
        break;
      case 'X':
        if (ctrlKey(e)) {
          e.preventDefault();
          this.props.setMode('recentlyViewed');
        }
        break;
      default:
        this.setState({
          undoIndex: this.props.searchHistory.size - 1
        });
        break;
    }
  };

  nextPage = () => {
    const {
      firstVisibleIndex,
      maxSuggestions,
      suggestions: { length: numSuggestions }
    } = this.state;
    const newFirstVisibleIndex = Math.max(
      0,
      Math.min(
        firstVisibleIndex + maxSuggestions,
        numSuggestions - maxSuggestions
      )
    );
    this.setState({
      firstVisibleIndex: newFirstVisibleIndex,
      selectedIndex: 0
    });
  };

  previousPage = () => {
    const { firstVisibleIndex, maxSuggestions } = this.state;
    const newFirstVisibleIndex = Math.max(
      0,
      firstVisibleIndex - maxSuggestions
    );
    this.setState({
      firstVisibleIndex: newFirstVisibleIndex,
      selectedIndex: 0
    });
  };

  incrementSelectedIndex = increment => {
    const { selectedIndex } = this.state;
    this.trySetIndex(selectedIndex + increment);
  };

  trySetIndex = index => {
    if (this.indexInRange(index)) {
      this.setState({ selectedIndex: index });
    } else {
      const { firstVisibleIndex, maxSuggestions, suggestions } = this.state;
      if (index < 0 && firstVisibleIndex > 0) {
        this.setState({ firstVisibleIndex: firstVisibleIndex - 1 });
      } else if (
        index >= maxSuggestions &&
        firstVisibleIndex + maxSuggestions < suggestions.length
      ) {
        this.setState({ firstVisibleIndex: firstVisibleIndex + 1 });
      }
    }
  };

  indexInRange = index => {
    const { suggestions, maxSuggestions } = this.state;
    return (
      index >= 0 &&
      index <= Math.max(0, Math.min(suggestions.length, maxSuggestions) - 1)
    );
  };

  closeTab = async (index = this.state.selectedIndex) => {
    const { suggestions, firstVisibleIndex } = this.state;
    const suggestion = suggestions[firstVisibleIndex + index];
    if (suggestion && this.props.mode === 'tab') {
      await closeTab(suggestion);
      suggestions.splice(firstVisibleIndex + index, 1);
      this.setState({ suggestions });
    }
  };

  tryActivateSuggestion = async (index = this.state.selectedIndex) => {
    const { suggestions, firstVisibleIndex } = this.state;
    const suggestion = suggestions[firstVisibleIndex + index];
    if (suggestion) {
      if (suggestion.type === 'mode') {
        this.props.setMode(suggestion.mode);
      } else {
        activateSuggestion(suggestion);
        await browser.runtime.sendMessage({
          key: 'closeSaka',
          searchHistory: [...this.props.searchHistory]
        });
      }
    }
  };

  handleInput = e => {
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
  };

  updateAutocompleteSuggestions = async searchStringAtLookup => {
    const suggestions = await getSuggestions(
      this.props.mode,
      searchStringAtLookup
    );

    const { searchString: searchStringNow } = this.state;
    if (searchStringNow === searchStringAtLookup) {
      this.setState({
        suggestions: suggestions.map(suggestion =>
          preprocessSuggestion(suggestion, searchStringAtLookup)
        ),
        firstVisibleIndex: 0,
        selectedIndex: 0
      });
    }
  };

  handleBlur = e => {
    this.props.updateSearchHistory(e.target.value);
  };

  handleButtonClick = () => {
    this.props.setMode('mode');
  };

  handleSuggestionClick = index => {
    this.tryActivateSuggestion(index);
  };

  render() {
    const { placeholder, mode, showEmptySearchSuggestions } = this.props;
    const {
      searchString,
      suggestions,
      selectedIndex,
      firstVisibleIndex,
      maxSuggestions
    } = this.state;
    const suggestion = suggestions[firstVisibleIndex + selectedIndex];

    if (!showEmptySearchSuggestions && !searchString) {
      return (
        <BackgroundImage suggestion={suggestion}>
          <GUIContainer onWheel={this.handleWheel}>
            <ModeSwitcher setMode={this.props.setMode} />
            <SearchBar
              placeholder={placeholder}
              searchString={searchString}
              suggestion={suggestion}
              onKeyDown={this.handleKeyDown}
              onInput={this.handleInput}
              onBlur={this.handleBlur}
              onButtonClick={this.handleButtonClick}
              onSuggestionClick={this.handleSuggestionClick}
              mode={mode}
            />
          </GUIContainer>
        </BackgroundImage>
      );
    }

    // TODO: Rename suggestions and suggestion
    return (
      <BackgroundImage suggestion={suggestion}>
        <GUIContainer onWheel={this.handleWheel}>
          <ModeSwitcher mode={mode} setMode={this.props.setMode} />
          <SearchBar
            placeholder={placeholder}
            searchString={searchString}
            suggestion={suggestion}
            onKeyDown={this.handleKeyDown}
            onInput={this.handleInput}
            onBlur={this.handleBlur}
            onButtonClick={this.handleButtonClick}
            onSuggestionClick={this.handleSuggestionClick}
            mode={mode}
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
}
