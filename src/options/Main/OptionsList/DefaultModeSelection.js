import { Component, h } from 'preact';
import 'material-components-web/dist/material-components-web.css';

export default class DefaultModeSelection extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { mode, handleModeChange } = this.props;
    return (
      <li className="mdc-list-item option">
        <span className="mdc-list-item__text">
          Default Mode
          <span className="mdc-list-item__secondary-text">
            Select the default mode Saka opens with
          </span>
        </span>
        <div className="mdc-select mdc-list-item__meta">
          <select
            value={mode}
            id="defaultModeSelect"
            className=" mdc-select__native-control"
            onChange={handleModeChange}
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
