import { h } from 'preact';
import { fadedColorMap } from 'lib/colors';
import './style.css';

export default ({
  type,
  title,
  titleColor,
  secondary,
  secondaryColor,
  url,
  icon,
  selected,
  index
}) => (
  <li
    class='mdc-list-item search-item'
    style={{
      backgroundColor: selected ? 'rgb(237, 237, 237)' : '#ffffff',
      borderLeftColor: fadedColorMap[type]
    }}
  >
    <span class='mdc-list-item__start-detail search-icon' role='presentation'>
      { url ? (
        <div
          style={`width: 25px; height: 25px; content: -webkit-image-set(url(chrome://favicon/size/16@1x/${url}) 1x, url(chrome://favicon/size/16@2x/${url}) 2x);`}
        />
      ) : (
        <i class='material-icons' aria-hidden='true'>
          { icon }
        </i>
      )}
    </span>
    <span class='mdc-list-item__text'>
      <span
        class='suggestion-wrap-text'
        style={{ color: titleColor }}
      >
        { title }
      </span>
      { secondary &&
        <span
          class='mdc-list-item__text__secondary suggestion-wrap-text'
          style={{ color: secondaryColor || 'inherit' }}
        >
          { secondary }
        </span>
      }
    </span>
    <span
      class='mdc-list-item__end-detail kbd-end-detail'
      style={{ color: 'gray', textDecoration: 'none' }}
    >
      { selected ? 'enter' : `alt-${index + 1}` }
    </span>
  </li>
);
