import { Component, h } from 'preact';

export default class DefaultModeSelection extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li class="mdc-list-item option">
        <span class="mdc-list-item__text">
          Default Mode
          <span class="mdc-list-item__secondary-text">
            Select the default mode Saka opens with
          </span>
        </span>
        <div class="mdc-select mdc-list-item__meta">
          <select
            value={this.props.mode}
            id="defaultModeSelect"
            class=" mdc-select__native-control"
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
        </div>
      </li>
    );
  }
}
