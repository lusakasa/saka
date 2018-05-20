import { h } from 'preact';
import { colorMap } from 'lib/colors.js';
import 'scss/styles.scss';

const Item = ({ label, color }) => (
  <span
    role="button"
    aria-pressed="false"
    style={{ color }}
    className="settings-item"
  >
    {label}
  </span>
);

export default () => (
  <section id="settings-bar">
    <Item label="Commands" color={colorMap.command} />
    <Item label="Tabs" color={colorMap.tabs} />
    <Item label="Search" color={colorMap.search} />
    <Item label="History" color={colorMap.history} />
    <Item label="Bookmarks" color={colorMap.bookmark} />
    <Item label="Dictionary" color={colorMap.dictionary} />
    <Item label="Calculator" color={colorMap.calculator} />
  </section>
);
