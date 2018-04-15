import { Component, h } from 'preact';
import DefaultModeSelection from './DefaultModeSelection';

export default class OptionsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: 'tab'
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
        mode: sakaSettings.mode
      });
    });
  }

  handleOptionsSave = e => {
    const settingsStore = { mode: this.state.mode };
    chrome.storage.sync.set({ sakaSettings: settingsStore }, function() {
      console.log('Saka Settings set to ', settingsStore);
    });
  };

  handleModeChange = e => {
    this.setState({
      mode: e.target.value
    });
  };

  render() {
    return (
      <form>
        <DefaultModeSelection
          handleModeChange={this.handleModeChange}
          mode={this.state.mode}
        />
        <input
          type="submit"
          value="Submit"
          class="mdc-button mdc-button--raised mdc-button--dense"
          onClick={this.handleOptionsSave}
        >
          Save
        </input>
      </form>
    );
  }
}
