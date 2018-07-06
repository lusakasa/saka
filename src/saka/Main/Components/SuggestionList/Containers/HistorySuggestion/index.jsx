import { h } from 'preact';
import highlight from 'lib/highlight.jsx';
import Suggestion from '../../Components/Suggestion/index.jsx';

export default ({
  suggestion: { title, url, matches },
  selected,
  index,
  onClick
}) => (
  <Suggestion
    type="history"
    title={highlight(title, 'title', matches)}
    titleColor="#000000"
    secondary={highlight(url, 'url', matches)}
    secondaryColor="rgba(63, 81, 245, 1.0)"
    icon="history"
    url={url}
    selected={selected}
    index={index}
    onClick={onClick}
  />
);
