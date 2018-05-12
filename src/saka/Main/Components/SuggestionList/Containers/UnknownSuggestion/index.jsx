import { h } from 'preact';
import Suggestion from '../../Components/Suggestion/index.jsx';

export default ({ suggestion: { title }, selected, index, onClick }) => (
  <Suggestion
    type="unknown"
    title={title}
    icon="error_outline"
    titleColor="red"
    selected={selected}
    index={index}
    onClick={onClick}
  />
);
