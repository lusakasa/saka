import { Component, h } from 'preact';

export default class OnlyShowSearchBarSelector extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { checked, handleShowSearchSuggestionsChange } = this.props;
    return (
      <li class="mdc-list-item option">
        <span class="mdc-list-item__text">
          Suggestions on load
          <span class="mdc-list-item__secondary-text">
            Show suggestions when there is no text is the Saka search bar
          </span>
        </span>
        <div class="mdc-list-item__meta mdc-switch">
          <input
            type="checkbox"
            id="basic-switch"
            class="mdc-switch__native-control"
            checked={checked}
            onChange={handleShowSearchSuggestionsChange}
          />
          <div class="mdc-switch__background">
            <div class="mdc-switch__knob" />
          </div>
        </div>
      </li>
    );
  }
}
