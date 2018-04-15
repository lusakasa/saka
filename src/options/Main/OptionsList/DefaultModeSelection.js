import { Component, h } from 'preact';

export default class DefaultModeSelection extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="mdc-select">
        <select
          value={this.props.mode}
          class="mdc-select__native-control"
          onChange={this.props.handleModeChange}
        >
          <option value="tab" selected="">
            Tabs
          </option>
          <option value="closedTab" selected="">
            Recently Closed
          </option>
          <option value="bookmark" selected="">
            Bookmarks
          </option>
          <option value="mode" selected="">
            Modes
          </option>
        </select>
        <div class="mdc-select__label mdc-select__label--float-above">
          Default mode for Saka
        </div>
        <div class="mdc-select__bottom-line" />
      </div>
    );
  }
}
