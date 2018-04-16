import { Component, h } from 'preact';
import DefaultModeSelection from './DefaultModeSelection';
import OnlyShowSearchBarSelector from './OnlyShowSearchBarSelector';

export default class OptionsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      mode: 'tab',
      showEmptySearchSuggestions: true
    };
  }

  componentDidMount() {
    var retrieveSakaSettings = new Promise(function(resolve, reject) {
      chrome.storage.sync.get(['sakaSettings'], result => {
        resolve(result.sakaSettings);
      });
    });

    retrieveSakaSettings.then(sakaSettings => {
      console.log('Saka Settings fetched ', sakaSettings);

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
    });
  }

  handleOptionsSave = e => {
    const settingsStore = {
      mode: this.state.mode,
      showEmptySearchSuggestions: this.state.showEmptySearchSuggestions
    };

    chrome.storage.sync.set({ sakaSettings: settingsStore }, function() {
      console.log('Saka Settings set to ', settingsStore);
    });
  };

  handleModeChange = e => {
    this.setState({
      mode: e.target.value
    });
  };

  handleShowSearchSuggestionsChange = e => {
    this.setState({
      showEmptySearchSuggestions: !this.state.showEmptySearchSuggestions
    });
  };

  render() {
    console.log('State: ', this.state);
    if (!this.state.isLoading) {
      return (
        <div class="options-form">
          <form>
            <div class="mdc-list-group">
              <h3 class="mdc-list-group__subheader">General Settings</h3>
              <ul class="mdc-list mdc-list--non-interactive mdc-list--dense">
                <DefaultModeSelection
                  handleModeChange={this.handleModeChange}
                  mode={this.state.mode}
                />
                <li
                  role="separator"
                  class="mdc-list-divider mdc-list-divider--padded options-separator"
                />
                <OnlyShowSearchBarSelector
                  checked={this.state.showEmptySearchSuggestions}
                  handleShowSearchSuggestionsChange={
                    this.handleShowSearchSuggestionsChange
                  }
                />
              </ul>
            </div>
            <div dir="rtl" class="options-save">
              <input
                type="submit"
                value="Save"
                class="mdc-button mdc-button--raised mdc-button--dense options-save-button"
                onClick={this.handleOptionsSave}
              />
            </div>
          </form>
        </div>
      );
    }
  }
}
