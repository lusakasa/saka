import { Component, h } from 'preact';

// import '@material/textfield/dist/mdc.textfield.min.css';
import 'scss/styles.scss';

export default class Input extends Component {
  render() {
    const {
      placeholder,
      searchString,
      onKeyDown,
      onInput,
      onBlur
    } = this.props;

    return (
      <section className="mdc-text-field mdc-text-field--fullwidth search-field-wrapper">
        <input
          id="search-bar"
          className="mdc-text-field__input search-field-input"
          type="text"
          placeholder={placeholder}
          aria-label={placeholder}
          onKeyDown={onKeyDown}
          onInput={onInput}
          value={searchString}
          onBlur={onBlur}
          ref={input => input && input.focus()}
        />
      </section>
    );
  }
}
