import 'material-components-web/dist/material-components-web.css';
import 'scss/styles.scss';
import browser from 'webextension-polyfill';
import { Component, h } from 'preact';
import StandardSearch from './Containers/StandardSearch/index.jsx';

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: 'tab',
      modes: ['tab', 'closedTab', 'bookmark', 'history', 'recentlyViewed'],
      isLoading: true,
      showEmptySearchSuggestions: true,
      searchHistory: new Set([])
    };
  }

  async componentDidMount() {
    const sakaSettings = await this.fetchSakaSettings();
    this.setState(sakaSettings);
  }

  setMode = mode => {
    this.setState({ mode });
  };

  shuffleMode = () => {
    const { mode, modes } = this.state;
    const nextIndex = modes.indexOf(mode) + 1;
    const nextModeIndex = nextIndex >= modes.length ? 0 : nextIndex;
    this.setMode(modes[nextModeIndex]);
  };

  fetchSakaSettings = async function fetchSakaSettings() {
    const { sakaSettings } = await browser.storage.sync.get(['sakaSettings']);
    let { searchHistory } = await browser.storage.sync.get(['searchHistory']);
    searchHistory =
      searchHistory !== undefined && searchHistory.length > 0
        ? new Set(searchHistory)
        : new Set(['']);

    if (sakaSettings !== undefined) {
      const { mode, showEmptySearchSuggestions } = sakaSettings;
      return {
        isLoading: false,
        mode,
        showEmptySearchSuggestions,
        searchHistory
      };
    }

    return {
      isLoading: false,
      searchHistory
    };
  };

  updateSearchHistory = (searchString, callback) => {
    const { searchHistory } = this.state;
    searchHistory.delete(searchString);
    searchHistory.add(searchString);

    this.setState({ searchHistory }, callback);
  };

  render() {
    const {
      mode,
      isLoading,
      showEmptySearchSuggestions,
      searchHistory
    } = this.state;
    const { setMode, shuffleMode } = this;

    if (!isLoading) {
      switch (mode) {
        case 'tab':
          return (
            <StandardSearch
              mode={mode}
              placeholder="Tabs"
              setMode={setMode}
              shuffleMode={shuffleMode}
              showEmptySearchSuggestions={showEmptySearchSuggestions}
              searchHistory={searchHistory}
              updateSearchHistory={this.updateSearchHistory}
            />
          );
        case 'closedTab':
          return (
            <StandardSearch
              mode={mode}
              placeholder="Recently Closed"
              setMode={setMode}
              shuffleMode={shuffleMode}
              showEmptySearchSuggestions={showEmptySearchSuggestions}
              searchHistory={searchHistory}
              updateSearchHistory={this.updateSearchHistory}
            />
          );
        case 'bookmark':
          return (
            <StandardSearch
              mode={mode}
              placeholder="Bookmarks"
              setMode={setMode}
              shuffleMode={shuffleMode}
              showEmptySearchSuggestions={showEmptySearchSuggestions}
              searchHistory={searchHistory}
              updateSearchHistory={this.updateSearchHistory}
            />
          );
        case 'history':
          return (
            <StandardSearch
              mode={mode}
              placeholder="History"
              setMode={setMode}
              shuffleMode={shuffleMode}
              showEmptySearchSuggestions={showEmptySearchSuggestions}
              searchHistory={searchHistory}
              updateSearchHistory={this.updateSearchHistory}
            />
          );
        case 'recentlyViewed':
          return (
            <StandardSearch
              mode={mode}
              placeholder="Recently Viewed"
              setMode={setMode}
              shuffleMode={shuffleMode}
              showEmptySearchSuggestions={showEmptySearchSuggestions}
              searchHistory={searchHistory}
              updateSearchHistory={this.updateSearchHistory}
            />
          );
        default:
          return <div>Error, invalid mode</div>;
      }
    } else {
      return <div />;
    }
  }
}
