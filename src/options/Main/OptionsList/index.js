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
    if (!this.state.isLoading) {
      return (
        <div className="options-form">
          <form>
            <div className="mdc-list-group">
              <h3 className="mdc-list-group__subheader">General Settings</h3>
              <ul className="mdc-list mdc-list--non-interactive mdc-list--dense">
                <DefaultModeSelection
                  handleModeChange={this.handleModeChange}
                  mode={this.state.mode}
                />
                <li
                  role="separator"
                  className="mdc-list-divider mdc-list-divider--padded options-separator"
                />
                <OnlyShowSearchBarSelector
                  checked={this.state.showEmptySearchSuggestions}
                  handleShowSearchSuggestionsChange={
                    this.handleShowSearchSuggestionsChange
                  }
                />
                <li
                  role="separator"
                  className="mdc-list-divider mdc-list-divider--padded options-separator"
                />
              </ul>
            </div>
            <div dir="rtl" className="options-save">
              <input
                type="submit"
                value="Save"
                className="mdc-button mdc-button--raised mdc-button--dense options-save-button"
                onClick={this.handleOptionsSave}
              />
            </div>
          </form>
        </div>
      );
    }
  }
}
