import { h } from 'preact';
import { suggestions } from 'src/suggestion_engine/server/providers/mode.js';
import Icon from 'src/saka/Main/Components/Icon/index.jsx';
import { fadedColorMap } from 'lib/colors.js';
import 'scss/styles.scss';

export default ({ mode, setMode }) => {
  const validModes = suggestions.map(suggestion => {
    const color =
      suggestion.mode === mode ? suggestion.fadedColor : fadedColorMap.unknown;

    return (
      <div
        className="mode-switcher-icon"
        style={
          suggestion.mode === mode
            ? `border-top: 3px solid  ${suggestion.fadedColor};`
            : {}
        }
        onClick={() => setMode(suggestion.mode)}
      >
        <Icon icon={suggestion.icon} color={color} />
      </div>
    );
  });

  return <div className="mode-switcher-wrapper">{validModes}</div>;
};
