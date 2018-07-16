import { h } from 'preact';
import Suggestion from './Containers/SuggestionSelector.jsx';

export default ({
  searchString,
  suggestions,
  selectedIndex,
  firstVisibleIndex,
  maxSuggestions,
  onSuggestionClick
}) => (
  <ul className="result-list">
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
