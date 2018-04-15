import { Component, h } from 'preact';
import SearchBar from '../../Components/SearchBar';
import SuggestionList from '../../Components/SuggestionList';
import PaginationBar from '../../Components/PaginationBar';
import GUIContainer from '../../Components/GUIContainer';
import BackgroundImage from '../../Components/BackgroundImage';

// provides suggestions but doesn't autocomplete input

export default class extends Component {
  state = {
    searchString: '',
    suggestions: [],
    selectedIndex: 0, // 0 <= selectedIndex < maxSuggestions
    firstVisibleIndex: 0, // 0 <= firstVisibleIndex < suggestion.length
    maxSuggestions: 6,
    backgroundImage: undefined
  };

  render() {
    const { placeholder, mode } = this.props;
    const {
      searchString,
      suggestions,
      selectedIndex,
      firstVisibleIndex,
      maxSuggestions
    } = this.state;
    const suggestion = suggestions[firstVisibleIndex + selectedIndex];
    // console.log('render suggestions', suggestions);
    return (
      <BackgroundImage suggestion={suggestion}>
        <GUIContainer onWheel={this.handleWheel}>
          <SearchBar
            placeholder={placeholder}
            searchString={searchString}
            suggestion={suggestion}
            onKeyDown={this.handleKeyDown}
            onInput={this.handleInput}
            onBlur={this.handleBlur}
            onButtonClick={this.handleButtonClick}
            onSuggestionClick={this.handleSuggestionClick}
            mode={mode}
          />
          <SuggestionList
            searchString={searchString}
            suggestions={suggestions}
            selectedIndex={selectedIndex}
            firstVisibleIndex={firstVisibleIndex}
            maxSuggestions={maxSuggestions}
            onSuggestionClick={this.handleSuggestionClick}
          />
          <PaginationBar
            selectedIndex={selectedIndex}
            suggestions={suggestions}
            firstVisibleIndex={firstVisibleIndex}
            maxSuggestions={maxSuggestions}
            onClickPrevious={this.previousPage}
            onClickNext={this.nextPage}
          />
        </GUIContainer>
      </BackgroundImage>
    );
  }

  handleKeyDown = e => {
    switch (e.key) {
      case 'Escape':
        browser.runtime.sendMessage('closeSaka');
        break;
    }
  };

  handleBlur = e => {
    e.target.focus();
  };
  handleButtonClick = e => {
    this.props.setMode('mode');
  };
  handleSuggestionClick = index => {
    this.tryActivateSuggestion(index);
  };
}
