import { h } from 'preact';
import { fadedColorMap } from 'lib/colors.js';
import { ctrlChar } from 'lib/utils.js';
import { icons } from 'suggestion_utils/index.js';

export default ({
  type,
  title,
  titleColor,
  secondary,
  secondaryColor,
  url,
  favIconUrl,
  incognito,
  selected,
  index,
  onClick
}) => {
  const color = fadedColorMap[type];
  const icon = icons[type];
  const incognitoIcon = icons.incognito;
  let suggestionIcon;

  if (incognito) {
    suggestionIcon = (
      <i
        className="result__icon result__icon--material"
        aria-hidden="true"
        style={{ color }}
      >
        {incognitoIcon}
      </i>
    );
  } else if (SAKA_PLATFORM === 'chrome' && url) {
    suggestionIcon = (
      <div
        className="result__icon"
        style={`content: -webkit-image-set(url(chrome://favicon/size/16@1x/${url}) 1x, url(chrome://favicon/size/16@2x/${url}) 2x)`}
      />
    );
  } else if (SAKA_PLATFORM === 'firefox' && favIconUrl) {
    suggestionIcon = <img className="result__icon" src={favIconUrl} alt="" />;
  } else {
    suggestionIcon = (
      <i
        className="result__icon result__icon--material"
        aria-hidden="true"
        style={{ color }}
      >
        {icon}
      </i>
    );
  }

  return (
    <li
      className="result"
      style={{
        // backgroundColor: selected && 'rgb(237, 237, 237)',
        borderLeftColor: color
      }}
      onKeyPress={() => onClick(index)}
      onClick={() => onClick(index)}
    >
      <span className="result__icon-container">{suggestionIcon}</span>
      <span className="result__text-section">
        <span className="result__title" style={{ color: titleColor }}>
          {title}
        </span>
        {secondary && (
          <span
            className="result__url"
            style={{ color: secondaryColor || 'inherit' }}
          >
            {secondary}
          </span>
        )}
      </span>
      <span className="result__right-icon-container">
        {selected ? (
          <i className="result__icon result__icon--material" style={{ color }}>
            {icon}
          </i>
        ) : (
          `${ctrlChar}-${index + 1}`
        )}
      </span>
    </li>
  );
};
