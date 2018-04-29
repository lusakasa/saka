import { h } from 'preact';
import { fadedColorMap } from 'lib/colors';
import { ctrlChar } from 'lib/utils';
import { icons } from 'src/suggestion_utils';
import 'scss/styles.scss';

export default ({
  type,
  title,
  titleColor,
  secondary,
  secondaryColor,
  url,
  favIconUrl,
  selected,
  index,
  onClick
}) => {
  const color = fadedColorMap[type];
  const icon = icons[type];
  return (
    <li
      className="mdc-list-item search-item"
      style={{
        backgroundColor: selected ? 'rgb(237, 237, 237)' : '#ffffff',
        borderLeftColor: color
      }}
      onClick={() => onClick(index)}
    >
      <span className="mdc-list-item__graphic search-icon" role="presentation">
        {SAKA_PLATFORM === 'chrome' && url ? (
          <div
            style={`width: 25px; height: 25px; content: -webkit-image-set(url(chrome://favicon/size/16@1x/${url}) 1x, url(chrome://favicon/size/16@2x/${url}) 2x)`}
          />
        ) : SAKA_PLATFORM === 'firefox' && favIconUrl ? (
          <img style="width: 25px; height: 25px" src={favIconUrl} />
        ) : (
          <i className="material-icons" aria-hidden="true" style={{ color }}>
            {icon}
          </i>
        )}
      </span>
      <span className="mdc-list-item__text">
        <span className="suggestion-wrap-text" style={{ color: titleColor }}>
          {title}
        </span>
        {secondary && (
          <span
            className="mdc-list-item__secondary-text suggestion-wrap-text"
            style={{ color: secondaryColor || 'inherit' }}
          >
            {secondary}
          </span>
        )}
      </span>
      <span className="mdc-list-item__meta kbd-end-detail">
        {selected ? (
          <i
            className="mdc-list-item__graphic material-icons"
            aria-hidden="true"
            style={{ color }}
          >
            {icon}
          </i>
        ) : (
          `${ctrlChar}-${index + 1}`
        )}
      </span>
    </li>
  );
};
