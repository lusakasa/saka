import 'material-components-web/dist/material-components-web.css';

const ThemeSelection = function ThemeSelection({
   theme,
   handleThemeChange
  }) {
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
          <option value="light" selected="">
            Light
          </option>
          <option value="inverted" selected="">
            Inverted
          </option>
        </select>
      </div>
    </li>
  );
};

export default ThemeSelection;

