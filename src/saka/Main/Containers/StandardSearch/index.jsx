import { Component, h } from 'preact';
import {
  getSuggestions,
  activateSuggestion
} from 'suggestion_engine/client/index.js';
import { ctrlKey } from 'lib/utils.js';
import { slowWheelEvent } from 'lib/dom.js';
import SearchBar from '../../Components/SearchBar/index.jsx';
import SuggestionList from '../../Components/SuggestionList/index.jsx';
import PaginationBar from '../../Components/PaginationBar/index.jsx';
import GUIContainer from '../../Components/GUIContainer/index.jsx';
import BackgroundImage from '../../Components/BackgroundImage/index.jsx';
import ModeSwitcher from '../../Components/ModeSwitcher/index.jsx';
import api from './api.js';

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
    const prevSearch = api.getPreviousSearchString(
      this.state.undoIndex,
      this.props.searchHistory
    );
    this.setState(prevSearch);
    this.updateAutocompleteSuggestions(this.state.searchString);
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
    const eventHandler = api.getEventHandler(e);
    eventHandler();
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

    await api.updateAutocompleteSuggestions(
      suggestions,
      searchStringAtLookup,
      this.state.searchString
    );
  };

  handleBlur = e => {
    e.target.focus();
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
