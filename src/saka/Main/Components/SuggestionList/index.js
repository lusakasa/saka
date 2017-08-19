import { h, Component } from 'preact';
import Suggestion from './Containers/SuggestionSelector';
import '@material/list/dist/mdc.list.min.css';
import './style.css';

export default class SuggestionList extends Component {
  render () {
    const { searchString, suggestions, selectedIndex, firstVisibleIndex, maxSuggestions, onSuggestionClick } = this.props;
    return (
      <ul class='mdc-list mdc-list--two-line mdc-list--avatar-list two-line-avatar-text-icon-demo list-container'>
        { suggestions.slice(firstVisibleIndex, firstVisibleIndex + maxSuggestions).map((suggestion, index) =>
          <Suggestion
            key={index}
            suggestion={suggestion}
            searchString={searchString}
            selected={index === selectedIndex}
            index={index}
            onClick={onSuggestionClick}
          />
        )}
      </ul>
    );
  }
}
