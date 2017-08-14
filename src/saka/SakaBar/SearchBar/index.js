import { Component, h } from 'preact';
import { isURL, startsWithProtocol, startsWithWWW, stripProtocol, stripWWW } from 'lib/url';
import { cursorAtEnd } from '../../utils';
import { isLikeURL } from 'lib/url';
import '@material/textfield/dist/mdc.textfield.min.css';
import './style.css';

function suggestionMatchURLPortion (searchText, suggestion) {
  if (startsWithProtocol(searchText)) {
    return suggestion;
  } else if (startsWithWWW(searchText)) {
    return stripProtocol(suggestion);
  } else {
    return stripWWW(stripProtocol(suggestion));
  }
}

function autoComplete (searchText, suggestion) {
  if (!suggestion) return searchText;
  const suggestionText = suggestion.text.toLowerCase();
  searchText = searchText.toLowerCase();
  const possiblyMatchingPortion = isURL(suggestionText)
    ? suggestionMatchURLPortion(searchText, suggestionText)
    : suggestionText;
  return possiblyMatchingPortion.startsWith(searchText)
    ? possiblyMatchingPortion
    : searchText;
}

export default class SearchBar extends Component {
  render ({
    searchText,
    handleKeyDown,
    handleInput,
    suggestion,
    lastAction,
    handleClick
  }) {
    return (
      <section class='mdc-textfield mdc-textfield--fullwidth search-field-wrapper'>
        <input
          id='search-bar'
          class='mdc-textfield__input search-field-input'
          style={{ color: isLikeURL(searchText) ? 'rgb(63, 81, 245)' : 'black' }}
          type='text'
          placeholder='Search'
          aria-label='Search'
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          onClick={handleClick}
          onBlur={this.handleBlur}
          autoFocus
          value={suggestion && lastAction.startsWith('newSuggestions') && cursorAtEnd(this.input)
            ? autoComplete(searchText, suggestion)
            : searchText
          }
          ref={(input) => { this.input = input; }}
        />
      </section>
    );
  }
  handleBlur = (e) => {
    e.target.focus();
  }
  componentDidUpdate () {
    const { input } = this;
    const { lastAction, searchText, suggestion } = this.props;
    console.log(lastAction);
    switch (lastAction) {
      case 'initialize':
        input.focus();
        break;
      case 'populateDefaultURL':
        input.setSelectionRange(0, input.value.length);
        input.scrollLeft = 0;
        break;
      case 'changeSelectedIndex':
        console.log('changeSelectedIndex: value=', input.value);
        input.selectionStart = input.selectionEnd = input.value.length;
        break;
      case 'input':
        break;
      case 'backspace':
        console.log('start', input.selectionStart, 'end', input.selectionEnd);
        // input.setSelectionRange(0, input.value.length);
        break;
      case 'selectionchange':
        break;
      case 'newSuggestions':
        break;
      case 'newSuggestionsAndCursorAtEnd':
        const selectionEnd = Math.max(searchText.length,
          suggestion ? suggestion.text.length : 0);
        input.setSelectionRange(searchText.length, selectionEnd);
        break;
    }
  }
}
