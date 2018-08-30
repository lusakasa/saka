import { h, Component } from 'preact';
import TabSuggestion from './TabSuggestion/index.jsx';
import ClosedTabSuggestion from './ClosedTabSuggestion/index.jsx';
import BookmarkSuggestion from './BookmarkSuggestion/index.jsx';
import HistorySuggestion from './HistorySuggestion/index.jsx';
import RecentlyViewedSuggestion from './RecentlyViewedSuggestion/index.jsx';
import CommandSuggestion from './CommandSuggestion/index.jsx';
import SearchEngineSuggestion from './SearchEngineSuggestion/index.jsx';
import UnknownSuggestion from './UnknownSuggestion/index.jsx';

export default props => {
  switch (props.suggestion.type) {
    case 'tab':
      return <TabSuggestion {...props} />;
    case 'closedTab':
      return <ClosedTabSuggestion {...props} />;
    case 'bookmark':
      return <BookmarkSuggestion {...props} />;
    case 'history':
      return <HistorySuggestion {...props} />;
    case 'recentlyViewed':
      return <RecentlyViewedSuggestion {...props} />;
    case 'command':
      return <CommandSuggestion {...props} />;
    case 'searchEngine':
      return <SearchEngineSuggestion {...props} />;
    default:
      return <UnknownSuggestion {...props} />;
  }
};
