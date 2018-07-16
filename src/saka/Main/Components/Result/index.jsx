import { h } from 'preact';
import { ctrlChar } from 'lib/utils.js';
import modes from './modes';

const ResultContainer = ({ children, onClick }) => (
  <li className="result" onClick={onClick}>
    {children}
  </li>
);

//-----------------------------------------------------------------------------
// Shared Icon Components
//-----------------------------------------------------------------------------
const ChromeFavIcon = ({ url }) => (
  <div
    className="result__icon"
    style={`content: -webkit-image-set(url(chrome://favicon/size/16@1x/${url}) 1x, url(chrome://favicon/size/16@2x/${url}) 2x)`}
  />
);
const FirefoxFavIcon = ({ url }) => (
  <img className="result__icon" src={url} alt="" />
);
const FavIcon = SAKA_PLATFORM === 'chrome' ? ChromeFavIcon : FirefoxFavIcon;
const MaterialIcon = ({ name, color }) => (
  <i className="result__icon result__icon--material" style={{ color }}>
    {name}
  </i>
);

//-----------------------------------------------------------------------------
// Left Icon
//-----------------------------------------------------------------------------
const LeftIconSection = ({ children }) => (
  <span className="result__icon">{children}</span>
);
const LeftIcon = ({ url, name, color }) =>
  url ? <FavIcon url={url} /> : <MaterialIcon name={name} color={color} />;

//-----------------------------------------------------------------------------
// Text
//-----------------------------------------------------------------------------
const TextSection = ({ children }) => (
  <span className="result__text-section">{children}</span>
);
const Title = () => <span className="result__title">Title</span>;
const Subtitle = () => <span className="result__url">Subtitle</span>;

//-----------------------------------------------------------------------------
// Right Icon
//-----------------------------------------------------------------------------
const RightIconSection = ({ children }) => (
  <span className="result__right-icon-container">{children}</span>
);
const RightIcon = ({ name, color, selected, index }) =>
  selected ? (
    <MaterialIcon name={name} color={color} />
  ) : (
    `${ctrlChar}-${index + 1}`
  );

//-----------------------------------------------------------------------------
// Result
//-----------------------------------------------------------------------------
const Result = ({ rawResult, ui }) => {
  // const {
  //   // properties unique to the result
  //   result: {
  //     index,
  //     mode,
  //     title,
  //     subtitle,
  //     icon { url, name }, // either url or name should be defined, not both
  //     // overrides
  //     colors: {
  //       theme,
  //       title,
  //       subtitle
  //     }
  //   },
  //   ui: { query, firstVisibleIndex, selectedIndex }
  // } = props;
  const { mode, transform, activate } = modes[rawResult.mode];
  const result = transform(rawResult.result);
  const handleClick = () => activate(result);

  const selected = result.index === ui.selectedIndex;
  const index = result.index - ui.firstVisibleIndex;
  const colors = { ...mode.colors, ...result.colors };

  return (
    <ResultContainer
      selected={selected}
      leftBorderColor={colors.theme}
      onClick={handleClick}
    >
      <LeftIconSection>
        <LeftIcon
          url={result.icon.url}
          name={result.icon.name}
          color={colors.theme}
        />
      </LeftIconSection>

      <TextSection>
        <Title title={result.title} color={colors.title} />
        <Subtitle subtitle={result.subtitle} color={colors.subtitle} />
      </TextSection>

      <RightIconSection>
        <RightIcon
          name={mode.icon}
          color={mode.color}
          selected={selected}
          index={index}
        />
      </RightIconSection>
    </ResultContainer>
  );
};

export default Result;
