import { h } from 'preact';
import HotkeyListRow from './HotkeyListRow.jsx';
import 'material-components-web/dist/material-components-web.css';

const SakaHotkeysList = function SakaHotkeysList({
  handleOpenSakaKeybindings
}) {
  return (
    <div className="saka-hotkey-list">
      <div id="top-bar">
        <i
          className="mdc-icon-toggle material-icons"
          role="button"
          aria-pressed="false"
          aria-label="Back to Saka settings"
          onClick={handleOpenSakaKeybindings}
        >
          arrow_back
        </i>
        <h3 className="mdc-list-group__subheader">Keyboard Shortcuts</h3>
      </div>
      <div className="mdc-list-group">
        <ul className="mdc-list mdc-list--non-interactive mdc-list--dense">
          <HotkeyListRow title="Open Saka" keys={['Ctrl', 'Space']} />
          <li role="separator" className="mdc-list-divider options-separator" />
          <HotkeyListRow title="Close Saka" keys={['Esc']} />
          <li role="separator" className="mdc-list-divider options-separator" />
          <HotkeyListRow title="Next Result" keys={['Tab']} />
          <li role="separator" className="mdc-list-divider options-separator" />
          <HotkeyListRow title="Previous Result" keys={['Shift', 'Tab']} />
          <li role="separator" className="mdc-list-divider options-separator" />
          <HotkeyListRow title="Clear Search" keys={['Ctrl', 'k']} />
          <li role="separator" className="mdc-list-divider options-separator" />
          <HotkeyListRow
            title="Switch to next page of results"
            keys={['Ctrl', 'd']}
          />
          <li role="separator" className="mdc-list-divider options-separator" />
          <HotkeyListRow
            title="Switch To previous page of results"
            keys={['Ctrl', 's']}
          />
          <li role="separator" className="mdc-list-divider options-separator" />
          <HotkeyListRow
            title="Switch Modes (when search bar is empty)"
            keys={['Space']}
          />
          <li role="separator" className="mdc-list-divider options-separator" />
          <HotkeyListRow
            title="Switch Modes (when search bar not empty) "
            keys={['Shift', 'Space']}
          />
          <li role="separator" className="mdc-list-divider options-separator" />
          <HotkeyListRow
            title="Switch To Tabs Search"
            keys={['Ctrl', 'Shift', 'a']}
          />
          <li role="separator" className="mdc-list-divider options-separator" />
          <HotkeyListRow
            title="Switch To Recently Closed Tabs Search"
            keys={['Ctrl', 'Shift', 'c']}
          />
          <li role="separator" className="mdc-list-divider options-separator" />
          <HotkeyListRow
            title="Switch To Bookmark Search"
            keys={['Ctrl', 'b']}
          />
          <li role="separator" className="mdc-list-divider options-separator" />
          <HotkeyListRow
            title="Switch To History Search"
            keys={['Ctrl', 'Shift', 'e']}
          />
        </ul>
      </div>
    </div>
  );
};

export default SakaHotkeysList;
