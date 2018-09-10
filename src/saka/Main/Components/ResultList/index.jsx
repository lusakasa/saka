import { h } from 'preact';
import Result from '../Result/index.jsx';

// TODO: switch selected index from window index to total results index

export default props => {
  const {
    searchString,
    suggestions: results,
    selectedIndex,
    firstVisibleIndex,
    maxSuggestions: maxResults
  } = props;
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
      {visibleResults.map(result => <Result raw={result} ui={ui} />)}
    </ul>
  );
};
