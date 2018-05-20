import { h } from 'preact';
import { isURL } from 'lib/url';
import Suggestion from '../Suggestion';
import '@material/list/dist/mdc.list.min.css';
import './style.css';

export default ({ searchText, suggestions, selectedIndex }) => (
  <ul className="mdc-list mdc-list--two-line mdc-list--avatar-list two-line-avatar-text-icon-demo list-container">
    {suggestions.map((suggestion, index) => (
      <Suggestion
        key={index}
        suggestion={suggestion}
        searchText={searchText}
        detail={undefined}
        type={isURL(suggestion) ? 'url' : 'search'}
        selected={index === selectedIndex}
        index={index}
        role="listbox"
      />
    ))}
  </ul>
);
