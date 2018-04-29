import { Component, h } from 'preact';
import OptionsForm from './OptionsForm.jsx';
import SakaHotkeysList from './SakaHotkeysList.jsx';

export default class OptionsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      mode: 'tab',
      showEmptySearchSuggestions: true,
      showSakaKeybindings: true
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

  handleShowSearchSuggestionsChange = () => {
    this.setState({
      showEmptySearchSuggestions: !this.state.showEmptySearchSuggestions
    });
  };

  handleOpenSakaKeybindings = () => {
    this.setState({
      showSakaKeybindings: !this.state.showSakaKeybindings
    });
  };

  render() {
    if (!this.state.isLoading) {
      if (!this.state.showSakaKeybindings) {
        return (
          <OptionsForm
            handleModeChange={this.handleModeChange}
            mode={this.state.mode}
            showEmptySearchSuggestions={this.state.showEmptySearchSuggestions}
            handleShowSearchSuggestionsChange={
              this.handleShowSearchSuggestionsChange
            }
            handleOpenSakaKeybindings={this.handleOpenSakaKeybindings}
            handleOptionsSave={this.handleOptionsSave}
          />
        );
      }
      return <SakaHotkeysList />;
    }
  }
}
