import { h } from 'preact';
import { suggestions } from 'src/suggestion_engine/server/providers/mode.js';
import 'scss/styles.scss';

const Icon = ({ icon, color }) => (
  <i className="material-icons" aria-hidden="true" style={{ color }}>
    {icon}
  </i>
);

export default ({ setMode }) => {
  const validModes = suggestions.map(suggestion => {
    return (
      <div
        className="mode-switcher-icon"
        onClick={() => setMode(suggestion.mode)}
      >
        <Icon icon={suggestion.icon} color={suggestion.fadedColor} />
      </div>
    );
  });

  return <div>{validModes}</div>;
};
