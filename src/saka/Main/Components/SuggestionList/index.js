import { h, Component } from 'preact';
import Suggestion from './Containers/SuggestionSelector';
import 'scss/styles.scss';

export default class SuggestionList extends Component {
  render() {
    const {
      searchString,
      suggestions,
      selectedIndex,
      firstVisibleIndex,
      maxSuggestions,
      onSuggestionClick
    } = this.props;
    return (
      <ul class="mdc-list mdc-list--two-line mdc-list--avatar-list two-line-avatar-text-icon-demo list-container">
        {suggestions
          .slice(firstVisibleIndex, firstVisibleIndex + maxSuggestions)
          .map((suggestion, index) => (
            <Suggestion
              suggestion={suggestion}
              searchString={searchString}
              selected={index === selectedIndex}
              index={index}
              onClick={onSuggestionClick}
            />
          ))}
      </ul>
    );
  }
}
