import { Component, h } from 'preact';
import StandardSearch from './Containers/StandardSearch';
import PlaceholderSearch from './Containers/PlaceholderSearch';
import 'scss/styles.scss';

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: 'tab',
      modes: ['mode', 'tab', 'closedTab', 'bookmark'],
      isLoading: true
    };
  }

  componentDidMount() {
    var retrieveSakaSettings = new Promise(function(resolve, reject) {
      chrome.storage.sync.get(['sakaSettings'], result => {
        resolve(result.sakaSettings);
      });
    });

    retrieveSakaSettings.then(sakaSettings => {
      this.setState({
        mode: sakaSettings.mode,
        isLoading: false
      });
    });
  }

  render() {
    const { mode, isLoading } = this.state;
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
            />
          );
        case 'tab':
          return (
            <StandardSearch
              mode={mode}
              placeholder="Tabs"
              setMode={setMode}
              shuffleMode={shuffleMode}
            />
          );
        case 'closedTab':
          return (
            <StandardSearch
              mode={mode}
              placeholder="Recently Closed Tabs"
              setMode={setMode}
              shuffleMode={shuffleMode}
            />
          );
        case 'bookmark':
          return (
            <StandardSearch
              mode={mode}
              placeholder="Bookmarks"
              setMode={setMode}
              shuffleMode={shuffleMode}
            />
          );
        default:
          return <div>Error, invalid mode</div>;
      }
    } else {
      return (
        <PlaceholderSearch
          mode={mode}
          placeholder=""
          setMode={setMode}
          shuffleMode={shuffleMode}
        />
      );
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
