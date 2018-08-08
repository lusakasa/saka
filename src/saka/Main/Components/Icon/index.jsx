import { h } from 'preact';
import 'scss/styles.scss';

export default ({ icon, color }) => {
  return (
    <i
      id="icon"
      className="material-icons"
      aria-hidden="true"
      style={{ color }}
    >
      {icon}
    </i>
  );
};
