import browser from 'webextension-polyfill';
import { Component, h } from 'preact';
import DefaultModeSelection from './DefaultModeSelection.jsx';
import OnlyShowSearchBarSelector from './OnlyShowSearchBarSelector.jsx';
import ShowSakaHotkeys from './ShowSakaHotkeys.jsx';
import EnableFuzzySearch from './EnableFuzzySearch.jsx';
import ThemeSelection from './ThemeSelection.jsx';

export default class OptionsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      mode: 'tab',
      showEmptySearchSuggestions: true,
      enableFuzzySearch: true,
      theme: 'light'
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
        showEmptySearchSuggestions: sakaSettings.showEmptySearchSuggestions,
        enableFuzzySearch: sakaSettings.enableFuzzySearch,
        theme: sakaSettings.theme || 'light'
      };
    }

    return {
      isLoading: false
    };
  };

  handleOptionsSave = () => {
    const settingsStore = {
      mode: this.state.mode,
      showEmptySearchSuggestions: this.state.showEmptySearchSuggestions,
      enableFuzzySearch: this.state.enableFuzzySearch,
      theme: this.state.theme
    };

    browser.storage.sync.set({ sakaSettings: settingsStore });
  };

  handleModeChange = e => {
    this.setState({
      mode: e.target.value
    });
  };

  handleThemeChange = e => {
    this.setState({
      theme: e.target.value
    });
  };

  handleShowSearchSuggestionsChange = () => {
    this.setState({
      showEmptySearchSuggestions: !this.state.showEmptySearchSuggestions
    });
  };

  handleEnableFuzzySearch = () => {
    this.setState({
      enableFuzzySearch: !this.state.enableFuzzySearch
    });
  };

  render() {
    const { handleOpenSakaKeybindings } = this.props;

    if (!this.state.isLoading) {
      return (
        <div className="options-form">
          <div className="mdc-list-group">
            <h3 className="mdc-list-group__subheader">General Settings</h3>
            <ul className="mdc-list mdc-list--non-interactive mdc-list--dense">
              <ThemeSelection
                handleThemeChange={this.handleThemeChange}
                theme={this.state.theme}
                />
              <li
                role="separator"
                className="mdc-list-divider mdc-list-divider--padded options-separator"
              />
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
              <EnableFuzzySearch
                checked={this.state.enableFuzzySearch}
                handleEnableFuzzySearch={this.handleEnableFuzzySearch}
              />
              <li
                role="separator"
                className="mdc-list-divider mdc-list-divider--padded options-separator"
              />
              <ShowSakaHotkeys
                handleOpenSakaKeybindings={handleOpenSakaKeybindings}
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
        </div>
      );
    }
    return <div />;
  }
}
