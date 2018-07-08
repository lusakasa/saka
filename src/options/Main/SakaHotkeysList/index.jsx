import { h } from 'preact';
import HotkeyListRow from './HotkeyListRow.jsx';
import 'material-components-web/dist/material-components-web.css';
import { ctrlChar } from 'lib/utils';

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
          onKeyDown={handleOpenSakaKeybindings}
        >
          arrow_back
        </i>
        <div className="tooltip">
          <i
            id="custom-hotkey-info"
            className="mdc-icon-toggle material-icons"
            aria-pressed="false"
            aria-label="Info about Saka custom hotkeys"
          >
            info
          </i>
          {SAKA_PLATFORM === 'chrome' ? (
            <span className="tooltiptext">
              To modify the Saka hotkeys, please visit
              chrome://extensions/shortcuts
            </span>
          ) : (
            <span className="tooltiptext">
              It is currently not possible to modify hotkeys in firefox
            </span>
          )}
        </div>
      </div>
      <h3 className="mdc-list-group__subheader">Keyboard Shortcuts</h3>
      <div className="mdc-list-group">
        <ul className="mdc-list mdc-list--non-interactive mdc-list--dense">
          <HotkeyListRow title="Open Saka" keys={[ctrlChar, 'space']} />
          <li role="separator" className="mdc-list-divider options-separator" />
          <HotkeyListRow title="Close Saka" keys={['esc']} />
          <li role="separator" className="mdc-list-divider options-separator" />
          <HotkeyListRow
            title="Close Saka (when search bar is empty and focused)"
            keys={['← backspace']}
          />
          <li role="separator" className="mdc-list-divider options-separator" />
          <HotkeyListRow title="Next Result" keys={['tab']} />
          <li role="separator" className="mdc-list-divider options-separator" />
          <HotkeyListRow title="Previous Result" keys={['shift', 'tab']} />
          <li role="separator" className="mdc-list-divider options-separator" />
          <HotkeyListRow title="Clear Search" keys={[ctrlChar, 'k']} />
          <li role="separator" className="mdc-list-divider options-separator" />
          <HotkeyListRow title="View previous search" keys={[ctrlChar, 'z']} />
          <li role="separator" className="mdc-list-divider options-separator" />
          <HotkeyListRow title="View next search" keys={[ctrlChar, 'y']} />
          <li role="separator" className="mdc-list-divider options-separator" />
          <HotkeyListRow
            title="Switch to next page of results"
            keys={[ctrlChar, 'd']}
          />
          <li role="separator" className="mdc-list-divider options-separator" />
          <HotkeyListRow
            title="Switch To previous page of results"
            keys={[ctrlChar, 's']}
          />
          <li role="separator" className="mdc-list-divider options-separator" />
          <HotkeyListRow
            title="Switch Modes (when search bar is empty)"
            keys={['space']}
          />
          <li role="separator" className="mdc-list-divider options-separator" />
          <HotkeyListRow
            title="Switch Modes (when search bar not empty) "
            keys={['shift', 'space']}
          />
          <li role="separator" className="mdc-list-divider options-separator" />
          <HotkeyListRow
            title="Switch To Tabs Search"
            keys={[ctrlChar, 'shift', 'a']}
          />
          <li role="separator" className="mdc-list-divider options-separator" />
          <HotkeyListRow
            title="Switch To Recently Closed Tabs Search"
            keys={[ctrlChar, 'shift', 'c']}
          />
          <li role="separator" className="mdc-list-divider options-separator" />
          <HotkeyListRow
            title="Switch To Bookmark Search"
            keys={[ctrlChar, 'b']}
          />
          <li role="separator" className="mdc-list-divider options-separator" />
          <HotkeyListRow
            title="Switch To History Search"
            keys={[ctrlChar, 'shift', 'e']}
          />
        </ul>
      </div>
    </div>
  );
};

export default SakaHotkeysList;
