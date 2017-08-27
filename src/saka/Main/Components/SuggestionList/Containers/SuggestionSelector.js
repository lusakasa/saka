import { h, Component } from 'preact';
import ModeSuggestion from './ModeSuggestion';
import TabSuggestion from './TabSuggestion';
import ClosedTabSuggestion from './ClosedTabSuggestion';
import BookmarkSuggestion from './BookmarkSuggestion';
import HistorySuggestion from './HistorySuggestion';
import CommandSuggestion from './CommandSuggestion';
import SearchEngineSuggestion from './SearchEngineSuggestion';
import UnknownSuggestion from './UnknownSuggestion';

export default class Suggestion extends Component {
  render (props) {
    switch (props.suggestion.type) {
      case 'mode':
        return <ModeSuggestion {...props} />;
      case 'tab':
        return <TabSuggestion {...props} />;
      case 'closedTab':
        return <ClosedTabSuggestion {...props} />;
      case 'bookmark':
        return <BookmarkSuggestion {...props} />;
      case 'history':
        return <HistorySuggestion {...props} />;
      case 'command':
        return <CommandSuggestion {...props} />;
      case 'searchEngine':
        return <SearchEngineSuggestion {...props} />;
      default:
        return <UnknownSuggestion {...props} />;
    }
  }
}
