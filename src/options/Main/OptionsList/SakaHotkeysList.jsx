import { h } from 'preact';

import 'material-components-web/dist/material-components-web.css';

const SakaHotkeysList = function SakaHotkeysList() {
  return (
    <div className="options-form">
      <form>
        <div className="mdc-list-group">
          <div className="mdc-list-item__meta mdc-switch">
            <i
              className="mdc-list-item__graphic material-icons options-icon"
              aria-hidden="true"
            >
              {'arrow_back'}
            </i>
            <h3 className="mdc-list-group__subheader">Keyboard Shortcuts</h3>
          </div>
          <ul className="mdc-list mdc-list--non-interactive mdc-list--dense">
            <li className="mdc-list-item option">
              <span className="mdc-list-item__text">Open Saka</span>
              <div className="mdc-list-item__meta mdc-switch">
                <kbd>Ctrl</kbd>+<kbd>Space</kbd>
              </div>
            </li>
            <li
              role="separator"
              className="mdc-list-divider options-separator"
            />
            <li className="mdc-list-item option">
              <span className="mdc-list-item__text">Close Saka</span>
              <div className="mdc-list-item__meta mdc-switch">
                <kbd>Esc</kbd>
              </div>
            </li>
            <li
              role="separator"
              className="mdc-list-divider options-separator"
            />
            <li className="mdc-list-item option">
              <span className="mdc-list-item__text">
                Switch to next page of results
              </span>
              <div className="mdc-list-item__meta mdc-switch">
                <kbd>Ctrl</kbd>+<kbd>d</kbd>
              </div>
            </li>
            <li
              role="separator"
              className="mdc-list-divider options-separator"
            />
            <li className="mdc-list-item option">
              <span className="mdc-list-item__text">
                Switch To previous page of results
              </span>
              <div className="mdc-list-item__meta mdc-switch">
                <kbd>Ctrl</kbd>+<kbd>s</kbd>
              </div>
            </li>
            <li
              role="separator"
              className="mdc-list-divider options-separator"
            />
            <li className="mdc-list-item option">
              <span className="mdc-list-item__text">Switch Modes</span>
              <div className="mdc-list-item__meta mdc-switch">
                <kbd>Space</kbd>
              </div>
            </li>
            <li
              role="separator"
              className="mdc-list-divider options-separator"
            />
            <li className="mdc-list-item option">
              <span className="mdc-list-item__text">Switch To Tabs Search</span>
              <div className="mdc-list-item__meta mdc-switch">
                <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>A</kbd>
              </div>
            </li>
            <li
              role="separator"
              className="mdc-list-divider options-separator"
            />
            <li className="mdc-list-item option">
              <span className="mdc-list-item__text">
                Switch To Recently Closed Tabs Search
              </span>
              <div className="mdc-list-item__meta mdc-switch">
                <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>C</kbd>
              </div>
            </li>
            <li
              role="separator"
              className="mdc-list-divider options-separator"
            />
            <li className="mdc-list-item option">
              <span className="mdc-list-item__text">
                Switch To Bookmark Search
              </span>
              <div className="mdc-list-item__meta mdc-switch">
                <kbd>Ctrl</kbd>+<kbd>B</kbd>
              </div>
            </li>
            <li
              role="separator"
              className="mdc-list-divider options-separator"
            />
            <li className="mdc-list-item option">
              <span className="mdc-list-item__text">
                Switch To History Search
              </span>
              <div className="mdc-list-item__meta mdc-switch">
                <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>E</kbd>
              </div>
            </li>
          </ul>
        </div>
        <div dir="rtl" className="options-save">
          <input
            type="submit"
            value="Save"
            className="mdc-button mdc-button--raised mdc-button--dense options-save-button"
          />
        </div>
      </form>
    </div>
  );
};

export default SakaHotkeysList;
