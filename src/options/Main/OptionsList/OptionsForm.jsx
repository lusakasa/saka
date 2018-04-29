import { h } from 'preact';
import DefaultModeSelection from './DefaultModeSelection.jsx';
import OnlyShowSearchBarSelector from './OnlyShowSearchBarSelector.jsx';
import ShowSakaHotkeys from './ShowSakaHotkeys.jsx';
import 'material-components-web/dist/material-components-web.css';

const OptionsForm = function OptionsForm({
  handleModeChange,
  mode,
  showEmptySearchSuggestions,
  handleShowSearchSuggestionsChange,
  handleOpenSakaKeybindings,
  handleOptionsSave
}) {
  return (
    <div className="options-form">
      <form>
        <div className="mdc-list-group">
          <h3 className="mdc-list-group__subheader">General Settings</h3>
          <ul className="mdc-list mdc-list--non-interactive mdc-list--dense">
            <DefaultModeSelection
              handleModeChange={handleModeChange}
              mode={mode}
            />
            <li
              role="separator"
              className="mdc-list-divider mdc-list-divider--padded options-separator"
            />
            <OnlyShowSearchBarSelector
              checked={showEmptySearchSuggestions}
              handleShowSearchSuggestionsChange={
                handleShowSearchSuggestionsChange
              }
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
            onClick={handleOptionsSave}
          />
        </div>
      </form>
    </div>
  );
};

export default OptionsForm;
