import 'material-components-web/dist/material-components-web.css';
import 'scss/styles.scss';
import { h, Component } from 'preact';
import Suggestion from './Containers/SuggestionSelector.jsx';

export default ({
  searchString,
  suggestions,
  selectedIndex,
  firstVisibleIndex,
  maxSuggestions,
  onSuggestionClick
}) => (
  <ul className="mdc-list mdc-list--two-line mdc-list--avatar-list two-line-avatar-text-icon-demo list-container">
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
