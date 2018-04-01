import { h } from 'preact';
import Suggestion from '../../Components/Suggestion';
import { highlight } from '../../../../../../lib/highlight';

export default ({
  suggestion: { type, title, url, prettyURL, matches, favIconUrl },
  searchText,
  selected,
  index,
  onClick
}) =>
  <Suggestion
    type={'tab'}
    title={highlight(title, 'title', matches)}
    titleColor={'#000000'}
    secondary={highlight(url, 'url', matches)} // TODO: highlight matches are for normal URL not pretty URL
    // secondary={prettyURL}
    secondaryColor={'rgba(63, 81, 245, 1.0)'}
    url={url}
    favIconUrl={favIconUrl}
    icon={'star_border'}
    selected={selected}
    index={index}
    onClick={onClick}
  />;
