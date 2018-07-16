import { h } from 'preact';
import Result from '../Result/index.jsx';

// TODO: switch selected index from window index to total results index

export default ({
  searchString,
  suggestions: results,
  selectedIndex,
  firstVisibleIndex,
  maxSuggestions: maxResults,
  onSuggestionClick: activate
}) => {
  const ui = {
    query: searchString,
    firstVisibleIndex,
    selectedIndex: firstVisibleIndex + selectedIndex
  };
  const visibleResults = results.slice(
    firstVisibleIndex,
    firstVisibleIndex + maxResults
  );
  return (
    <ul className="result-list">
      {visibleResults.map(result => (
        <Result rawResult={result} ui={ui} activate={activate} />
      ))}
    </ul>
  );
};
