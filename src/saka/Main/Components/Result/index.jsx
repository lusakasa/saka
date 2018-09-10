import { h } from 'preact';
import { ctrlChar } from 'lib/utils.js';
import modes from 'modes/client.js';

const ResultContainer = ({ children, onClick }) => (
  <li className="result" onClick={onClick}>
    {children}
  </li>
);

// left icon

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
const LeftIconSection = ({ children }) => (
  <span className="result__icon-container">{children}</span>
);
const LeftIcon = ({ url, name, color }) =>
  url ? <FavIcon url={url} /> : <MaterialIcon name={name} color={color} />;

// text section

const TextSection = ({ children }) => (
  <span className="result__text-section">{children}</span>
);
const Title = ({ children, color }) => (
  <span className="result__title" style={{ color }}>
    {children}
  </span>
);
const Subtitle = ({ children, color }) => (
  <span className="result__url" style={{ color }}>
    {children}
  </span>
);

const RightIconSection = ({ children }) => (
  <span className="result__right-icon-container">{children}</span>
);
const RightIcon = ({ name, color, selected, index }) =>
  selected ? (
    <MaterialIcon name={name} color={color} />
  ) : (
    `${ctrlChar}-${index + 1}`
  );

const Result = ({ raw, ui }) => {
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

  const result = modes[raw.type].transform(raw, ui.query);
  const selected = false; // result.index === ui.selectedIndex;
  const index = result.index - ui.firstVisibleIndex;
  console.log('modes', modes);
  console.log('raw', raw);
  console.log('result', result);
  console.log('result.mode.colors', result.mode.colors);

  return (
    <ResultContainer
      selected={selected}
      leftBorderColor={result.mode.colors.theme}
      onClick={() => {
        console.log('todo');
      }}
    >
      <LeftIconSection>
        <LeftIcon
          url={result.icon.url}
          name={result.icon.name}
          color={result.mode.colors.theme}
        />
      </LeftIconSection>

      <TextSection>
        <Title color={result.mode.colors.title}>{result.title}</Title>
        <Subtitle color={result.mode.colors.subtitle}>
          {result.subtitle}
        </Subtitle>
      </TextSection>

      <RightIconSection>
        <RightIcon
          name={result.mode.icon}
          color={result.mode.color}
          selected={selected}
          index={index}
        />
      </RightIconSection>
    </ResultContainer>
  );
};

export default Result;
