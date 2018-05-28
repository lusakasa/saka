import { Component, h } from 'preact';
import 'material-components-web/dist/material-components-web.css';
import 'scss/styles.scss';
import StandardSearch from './Containers/StandardSearch/index.jsx';

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: 'tab',
      modes: [
        'mode',
        'tab',
        'closedTab',
        'bookmark',
        'history',
        'recentlyViewed'
      ],
      isLoading: true,
      showEmptySearchSuggestions: true
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

    if (sakaSettings !== undefined) {
      const { mode, showEmptySearchSuggestions } = sakaSettings;
      return {
        isLoading: false,
        mode,
        showEmptySearchSuggestions
      };
    }

    return {
      isLoading: false
    };
  };

  render() {
    const { mode, isLoading, showEmptySearchSuggestions } = this.state;
    const { setMode, shuffleMode } = this;

    if (!isLoading) {
      switch (mode) {
        case 'mode':
          return (
            <StandardSearch
              mode={mode}
              placeholder="Modes"
              setMode={setMode}
              shuffleMode={shuffleMode}
              showEmptySearchSuggestions={showEmptySearchSuggestions}
            />
          );
        case 'tab':
          return (
            <StandardSearch
              mode={mode}
              placeholder="Tabs"
              setMode={setMode}
              shuffleMode={shuffleMode}
              showEmptySearchSuggestions={showEmptySearchSuggestions}
            />
          );
        case 'closedTab':
          return (
            <StandardSearch
              mode={mode}
              placeholder="Recently Closed Tabs"
              setMode={setMode}
              shuffleMode={shuffleMode}
              showEmptySearchSuggestions={showEmptySearchSuggestions}
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
