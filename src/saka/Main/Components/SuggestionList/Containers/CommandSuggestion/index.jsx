import { h } from 'preact';
import Suggestion from '../../Components/Suggestion/index.jsx';

export default ({ suggestion: { title }, selected, index, onClick }) => (
  <Suggestion
    type="command"
    title={title}
    icon="input"
    titleColor="rgb(75, 165, 75)"
    selected={selected}
    index={index}
    onClick={onClick}
  />
);
