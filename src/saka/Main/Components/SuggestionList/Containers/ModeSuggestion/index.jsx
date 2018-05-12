import { h } from 'preact';
import { ctrlChar } from 'lib/utils.js';
import { highlight } from 'lib/highlight.js';
import { fadedColorMap } from 'lib/colors.js';

const Icon = ({ icon, color }) => (
  <i className="material-icons" aria-hidden="true" style={{ color }}>
    {icon}
  </i>
);

export default ({
  suggestion: { label, shortcut, icon, fadedColor, matches },
  selected,
  index,
  onClick
}) => (
  <li
    className="mdc-list-item search-item"
    style={{
      backgroundColor: selected ? 'rgb(237, 237, 237)' : '#ffffff',
      borderLeftColor: fadedColor
    }}
    onClick={() => onClick(index)}
    onKeyPress={() => onClick(index)}
  >
    <span className="mdc-list-item__graphic search-icon" role="presentation">
      <Icon icon={icon} color={fadedColor} />
    </span>
    <span className="mdc-list-item__text">
      <span className="suggestion-wrap-text">
        {highlight(label, 'label', matches)}
      </span>
      <span
        className="mdc-list-item__secondary-text suggestion-wrap-text"
        style={{ color: 'gray' }}
      >
        {shortcut}
      </span>
    </span>
    <span className="mdc-list-item__meta kbd-end-detail">
      {selected ? (
        <Icon icon="forward" color={fadedColorMap.mode} />
      ) : (
        `${ctrlChar}-${index + 1}`
      )}
    </span>
  </li>
);
