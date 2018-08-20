import { preprocessSuggestion } from 'suggestion_utils/index.js';

export default {
  getPreviousSearchString: (undoIndex, searchHistory) => {
    if (undoIndex !== 0) {
      return {
        searchString: [...searchHistory][undoIndex],
        undoIndex: undoIndex - 1
      };
    }

    return {
      searchString: [...searchHistory][undoIndex],
      undoIndex
    };
  },
  updateAutocompleteSuggestions: (
    suggestions = [],
    searchStringAtLookup,
    searchStringNow
  ) => {
    if (searchStringNow === searchStringAtLookup) {
      return {
        suggestions: suggestions.map(suggestion =>
          preprocessSuggestion(suggestion, searchStringAtLookup)
        ),
        firstVisibleIndex: 0,
        selectedIndex: 0
      };
    }

    return {};
  },
  getEventHandler: e => {
    switch (e.key) {
      case 'Escape':
        return function escapeEventHandler(searchHistory) {
          browser.runtime.sendMessage({
            key: 'closeSaka',
            searchHistory: [...searchHistory]
          });
        };
      case 'Backspace':
        if (!e.repeat && e.target.value === '') {
          return function backspaceEventHandler(searchHistory) {
            browser.runtime.sendMessage({
              key: 'closeSaka',
              searchHistory: [...searchHistory]
            });
          };
        }
        break;
      case 'ArrowLeft':
      case 'ArrowRight':
        break;
      case 'ArrowDown':
        e.preventDefault();
        return function arrowDownEventHandler(
          updateSearchHistory,
          incrementSelectedIndex,
          searchString
        ) {
          updateSearchHistory(searchString);
          incrementSelectedIndex(1);
        };
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
  }
};
