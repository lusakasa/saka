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
      <div>
        <form>
          <ul class="mdc-list mdc-list--non-interactive mdc-list--dense">
            <DefaultModeSelection
              handleModeChange={this.handleModeChange}
              mode={this.state.mode}
            />
            <li role="separator" class="mdc-list-divider" />

            <li class="mdc-list-item">
              <label class="mdc-list-item__text" for="basic-switch">
                Only show search bar on load
              </label>
              <div class="mdc-list-item__meta mdc-switch">
                <input
                  type="checkbox"
                  id="basic-switch"
                  class="mdc-switch__native-control"
                />
                <div class="mdc-switch__background">
                  <div class="mdc-switch__knob" />
                </div>
              </div>
            </li>
          </ul>
          <input
            type="submit"
            value="Save"
            class="mdc-button mdc-button--raised mdc-button--dense"
            onClick={this.handleOptionsSave}
          />
        </form>
      </div>
    );
  }
}
