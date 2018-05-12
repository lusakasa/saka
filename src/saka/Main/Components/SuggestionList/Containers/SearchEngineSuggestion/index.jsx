import { h } from 'preact';
import Suggestion from '../../Components/Suggestion/index.jsx';

export default ({
  suggestion: { title, isURL, prettyURL },
  selected,
  index,
  onClick
}) => (
  <Suggestion
    type="search"
    title={isURL ? prettyURL : title}
    titleColor={isURL ? 'rgba(63, 81, 245, 1.0)' : 'rgba(0, 0, 00, 0.87)'}
    secondary={isURL ? title : undefined}
    icon={isURL ? 'insert_drive_file' : 'search'}
    selected={selected}
    index={index}
    onClick={onClick}
  />
);
