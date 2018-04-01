import { h } from 'preact';
import { ctrlChar } from '../../../../../../lib/utils';
import { highlight } from '../../../../../../lib/highlight';
import { fadedColorMap } from '../../../../../../lib/colors';

const Icon = ({ icon, color }) => (
  <i class='material-icons' aria-hidden='true' style={{ color }} >
    {icon}
  </i>
);

export default ({
  suggestion: { label, shortcut, icon, color, fadedColor, matches },
  searchText,
  selected,
  index,
  onClick
}) => (
  <li
    class='mdc-list-item search-item'
    style={{
      backgroundColor: selected ? 'rgb(237, 237, 237)' : '#ffffff',
      borderLeftColor: fadedColor
    }}
    onClick={() => onClick(index)}
  >
    <span class='mdc-list-item__start-detail search-icon' role='presentation'>
      <Icon icon={icon} color={fadedColor} />
    </span>
    <span class='mdc-list-item__text'>
      <span
        class='suggestion-wrap-text'
      >
        {highlight(label, 'label', matches)}
      </span>
      <span
        class='mdc-list-item__text__secondary suggestion-wrap-text'
        style={{ color: 'gray' }}
      >
        {shortcut}
      </span>
    </span>
    <span class='mdc-list-item__end-detail kbd-end-detail'>
      {selected ? <Icon icon={'forward'} color={fadedColorMap.mode} /> : `${ctrlChar}-${index + 1}`}
    </span>
  </li>
);
