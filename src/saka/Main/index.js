import { Component, h } from 'preact';
import StandardSearch from './Containers/StandardSearch';
import 'scss/styles.scss';
import 'material-components-web/dist/material-components-web.css';

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: 'tab',
      modes: ['mode', 'tab', 'closedTab', 'bookmark'],
      isLoading: true
    };
  }

  async componentDidMount() {
    let { sakaSettings } = await browser.storage.sync.get(['sakaSettings']);

    if (sakaSettings !== undefined) {
      this.setState({
        isLoading: false,
        mode: sakaSettings.mode,
        showEmptySearchSuggestions: sakaSettings.showEmptySearchSuggestions
      });
    } else {
      this.setState({
        isLoading: false,
        mode: 'tab',
        showEmptySearchSuggestions: true
      });
    }
  }

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
        default:
          return <div>Error, invalid mode</div>;
      }
    }
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
}
