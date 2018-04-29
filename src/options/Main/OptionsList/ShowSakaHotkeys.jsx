import { h } from 'preact';

import 'material-components-web/dist/material-components-web.css';

const ShowSakaHotkeys = function ShowSakaHotkeys({
  handleOpenSakaKeybindings
}) {
  return (
    <li className="mdc-list-item option">
      <span className="mdc-list-item__text">Saka Hotkeys</span>
      <button
        className="mdc-list-item__meta mdc-button mdc-button__icon"
        onClick={handleOpenSakaKeybindings}
      >
        <i
          className="mdc-list-item__graphic material-icons options-icon"
          aria-hidden="true"
        >
          {'keyboard'}
        </i>
      </button>
    </li>
  );
};

export default ShowSakaHotkeys;
