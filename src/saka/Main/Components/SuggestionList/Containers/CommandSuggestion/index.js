import { h } from 'preact';
import Suggestion from '../../Components/Suggestion';

export default ({
  suggestion: { type, title, url },
  searchText,
  selected,
  index,
  onClick
}) =>
  <Suggestion
    type={'command'}
    title={title}
    icon={'input'}
    titleColor={'rgb(75, 165, 75)'}
    selected={selected}
    index={index}
    onClick={onClick}
  />;
