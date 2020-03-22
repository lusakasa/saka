import { h } from 'preact';
import 'material-components-web/dist/material-components-web.css';
import { Themes } from './themes';

export const ThemeSelection = function ThemeSelection({
   theme,
   handleThemeChange
  }) {
  const options = Object.keys(Themes).map(
    k => <option value={Themes[k]}>{k}</option>
  );
  return (
    <li className="mdc-list-item option">
      <span className="mdc-list-item__text">
        Theme
        <span className="mdc-list-item__secondary-text">
          Select theme for Saka overlay
        </span>
      </span>
      <div className="mdc-select mdc-list-item__meta">
        <select
          value={theme}
          id="themeSelect"
          aria-label="Select theme"
          className=" mdc-select__native-control"
          onChange={handleThemeChange}
        >
          {options}
        </select>
      </div>
    </li>
  );
};

export default ThemeSelection;

