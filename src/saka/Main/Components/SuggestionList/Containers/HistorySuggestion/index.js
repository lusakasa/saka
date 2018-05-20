import { h } from 'preact';
import { highlight } from 'lib/highlight.js';
import Suggestion from '../../Components/Suggestion';

export default ({
  suggestion: { type, title, url, prettyURL, matches },
  searchText,
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
