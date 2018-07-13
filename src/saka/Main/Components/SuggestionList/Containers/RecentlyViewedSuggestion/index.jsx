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
    type="recentlyViewed"
    title={highlight(title, 'title', matches)}
    titleColor="#000000"
    secondary={highlight(url, 'url', matches)} // TODO: highlight matches are for normal URL not pretty URL
    secondaryColor="rgba(63, 81, 245, 1.0)"
    icon="recentlyViewed"
    favIconUrl={favIconUrl}
    incognito={incognito}
    url={url}
    selected={selected}
    index={index}
    onClick={onClick}
  />
);
