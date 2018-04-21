import { h } from 'preact';

const OnlyShowSearchBarSelector = function OnlyShowSearchBarSelector() {
  const { checked, handleShowSearchSuggestionsChange } = this.props;
  return (
    <li className="mdc-list-item option">
      <span className="mdc-list-item__text">
        Suggestions on load
        <span className="mdc-list-item__secondary-text">
          Show suggestions when there is no text is the Saka search bar
        </span>
      </span>
      <div className="mdc-list-item__meta mdc-switch">
        <input
          type="checkbox"
          id="basic-switch"
          className="mdc-switch__native-control"
          checked={checked}
          onChange={handleShowSearchSuggestionsChange}
        />
        <div className="mdc-switch__background">
          <div className="mdc-switch__knob" />
        </div>
      </div>
    </li>
  );
};

export default OnlyShowSearchBarSelector;
