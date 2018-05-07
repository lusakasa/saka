import { h } from 'preact';

import 'material-components-web/dist/material-components-web.css';

const ShowSakaHotkeys = function ShowSakaHotkeys({
  handleOpenSakaKeybindings
}) {
  return (
    <li className="mdc-list-item option">
      <span className="mdc-list-item__text">Saka Hotkeys</span>
      <i
        className="mdc-list-item__meta mdc-icon-toggle material-icons"
        role="button"
        aria-pressed="false"
        aria-label="View Saka hotkeys"
        onClick={handleOpenSakaKeybindings}
      >
        keyboard
      </i>
    </li>
  );
};

export default ShowSakaHotkeys;
