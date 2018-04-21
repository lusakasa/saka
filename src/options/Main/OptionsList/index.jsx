import { Component, h } from 'preact';
import DefaultModeSelection from './DefaultModeSelection.jsx';
import OnlyShowSearchBarSelector from './OnlyShowSearchBarSelector.jsx';

export default class OptionsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      mode: 'tab',
      showEmptySearchSuggestions: true
    };
  }

  async componentDidMount() {
    const sakaSettings = await this.fetchSakaSettings();
    this.setState(sakaSettings);
  }

  fetchSakaSettings = async function fetchSakaSettings() {
    const { sakaSettings } = await browser.storage.sync.get(['sakaSettings']);

    if (sakaSettings !== undefined) {
      return {
        isLoading: false,
        mode: sakaSettings.mode,
        showEmptySearchSuggestions: sakaSettings.showEmptySearchSuggestions
      };
    }

    return {
      isLoading: false
    };
  };

  handleOptionsSave = e => {
    const settingsStore = {
      mode: this.state.mode,
      showEmptySearchSuggestions: this.state.showEmptySearchSuggestions
    };

    browser.storage.sync.set({ sakaSettings: settingsStore });
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
