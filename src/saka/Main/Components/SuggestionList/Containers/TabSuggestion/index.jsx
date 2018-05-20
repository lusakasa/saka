import { h } from 'preact';
import highlight from 'lib/highlight.jsx';
import Suggestion from '../../Components/Suggestion/index.jsx';

export default ({
  suggestion: { title, url, matches, favIconUrl, incognito },
  selected,
  index,
  onClick
}) => (
  <Suggestion
    type="tab"
    title={highlight(title, 'title', matches)}
    titleColor="#000000"
    secondary={highlight(url, 'url', matches)} // TODO: highlight matches are for normal URL not pretty URL
    // secondary={prettyURL}
    secondaryColor="rgba(63, 81, 245, 1.0)"
    url={url}
    favIconUrl={favIconUrl}
    incognito={incognito}
    icon="star_border"
    selected={selected}
    index={index}
    onClick={onClick}
    class="tab-suggestion"
  />
);
