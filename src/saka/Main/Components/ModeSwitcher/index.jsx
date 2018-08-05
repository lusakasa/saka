import { h } from 'preact';
import { suggestions } from 'src/suggestion_engine/server/providers/mode.js';
import { fadedColorMap } from 'lib/colors.js';
import 'scss/styles.scss';

const Icon = ({ selected, icon, selectedColor }) => {
  const color = selected ? selectedColor : fadedColorMap.unknown;

  return (
    <i className="material-icons" aria-hidden="true" style={{ color }}>
      {icon}
    </i>
  );
};

export default ({ mode, setMode }) => {
  const validModes = suggestions.map(suggestion => {
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
        <Icon
          selected={suggestion.mode === mode}
          icon={suggestion.icon}
          selectedColor={suggestion.fadedColor}
        />
      </div>
    );
  });

  return <div className="mode-switcher-wrapper">{validModes}</div>;
};
