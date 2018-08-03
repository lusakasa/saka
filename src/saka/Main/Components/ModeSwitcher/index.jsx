import { h } from 'preact';
import { suggestions } from 'src/suggestion_engine/server/providers/mode.js';
import 'scss/styles.scss';

const Icon = ({ icon, color }) => (
  <i className="material-icons" aria-hidden="true" style={{ color }}>
    {icon}
  </i>
);

export default ({ mode, setMode }) => {
  const validModes = suggestions.map(suggestion => {
    return (
      <div
        className="mode-switcher-icon"
        style={
          suggestion.mode === mode
            ? `background-color: white; border-top: 3px solid  ${
                suggestion.fadedColor
              };`
            : {}
        }
        onClick={() => setMode(suggestion.mode)}
      >
        <Icon icon={suggestion.icon} color={suggestion.fadedColor} />
      </div>
    );
  });

  return <div className="mode-switcher-wrapper">{validModes}</div>;
};
