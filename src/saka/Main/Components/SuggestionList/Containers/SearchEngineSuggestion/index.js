import { h } from 'preact';
import Suggestion from '../../Components/Suggestion';

export default ({
  suggestion: { type, title, isURL, prettyURL },
  searchText,
  selected,
  index
}) =>
  <Suggestion
    type={'search'}
    title={isURL ? prettyURL : title}
    titleColor={isURL
      ? 'rgba(63, 81, 245, 1.0)'
      : 'rgba(0, 0, 00, 0.87)'
    }
    secondary={isURL ? title : undefined}
    icon={isURL
      ? 'insert_drive_file'
      : 'search'
    }
    selected={selected}
    index={index}
  />;
