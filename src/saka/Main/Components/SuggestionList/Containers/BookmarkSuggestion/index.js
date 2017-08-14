import { h } from 'preact';
import Suggestion from '../../Components/Suggestion';

export default ({
  suggestion: { type, title, url, prettyURL },
  searchText,
  selected,
  index
}) =>
  <Suggestion
    type={'bookmark'}
    title={title}
    titleColor={'#000000'}
    secondary={prettyURL}
    secondaryColor={'rgba(63, 81, 245, 1.0)'}
    url={url}
    icon={'star_border'}
    selected={selected}
    index={index}
  />;
