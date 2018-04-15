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
      class="mdc-list-item search-item"
      style={{
        backgroundColor: selected ? 'rgb(237, 237, 237)' : '#ffffff',
        borderLeftColor: color
      }}
      onClick={() => onClick(index)}
    >
      <span class="mdc-list-item__start-detail search-icon" role="presentation">
        {SAKA_PLATFORM === 'chrome' && url ? (
          <div
            style={`width: 25px; height: 25px; content: -webkit-image-set(url(chrome://favicon/size/16@1x/${url}) 1x, url(chrome://favicon/size/16@2x/${url}) 2x)`}
          />
        ) : SAKA_PLATFORM === 'firefox' && favIconUrl ? (
          <img style="width: 25px; height: 25px" src={favIconUrl} />
        ) : (
          <i class="material-icons" aria-hidden="true" style={{ color }}>
            {icon}
          </i>
        )}
      </span>
      <span class="mdc-list-item__text">
        <span class="suggestion-wrap-text" style={{ color: titleColor }}>
          {title}
        </span>
        {secondary && (
          <span
            class="mdc-list-item__text__secondary suggestion-wrap-text"
            style={{ color: secondaryColor || 'inherit' }}
          >
            {secondary}
          </span>
        )}
      </span>
      <span class="mdc-list-item__end-detail kbd-end-detail">
        {selected ? (
          <i class="material-icons" aria-hidden="true" style={{ color }}>
            {icon}
          </i>
        ) : (
          `${ctrlChar}-${index + 1}`
        )}
      </span>
    </li>
  );
};
