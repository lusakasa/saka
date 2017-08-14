import { Component, h } from 'preact';
import '@material/textfield/dist/mdc.textfield.min.css';
import './style.css';

export default class Input extends Component {
  render () {
    const { searchString, onKeyDown, onInput, onBlur } = this.props;
    return (
      <section class='mdc-textfield mdc-textfield--fullwidth search-field-wrapper'>
        <input
          id='search-bar'
          class='mdc-textfield__input search-field-input'
          type='text'
          placeholder='Tab Search'
          aria-label='Tab Search'
          onKeyDown={onKeyDown}
          onInput={onInput}
          value={searchString}
          autoFocus
          onBlur={onBlur}
          ref={(input) => { this.input = input; }}
        />
      </section>
    );
  }
  componentDidMount () {
    this.input.focus();
  }
}
