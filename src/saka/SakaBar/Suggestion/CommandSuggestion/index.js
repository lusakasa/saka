import { h } from 'preact';
import Suggestion from '../Suggestion';

export default ({
  suggestion: { type, title, url },
  searchText,
  selected,
  index
}) =>
  <Suggestion
    type={'command'}
    title={title}
    icon={'input'}
    titleColor={'rgb(75, 165, 75)'}
    selected={selected}
    index={index}
  />;
