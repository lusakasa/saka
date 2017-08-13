import { h } from 'preact';
import Suggestion from '../Suggestion';

export default ({
  suggestion: { title, type },
  selected,
  index
}) =>
  <Suggestion
    type={'unknown'}
    title={title}
    icon={'error_outline'}
    titleColor={'red'}
    selected={selected}
    index={index}
  />;
