import { Component, h } from 'preact';
import { debounce } from 'decko';

import React from 'react';
// import '@material/textfield/dist/mdc.textfield.min.css';
import 'scss/styles.scss';

export default class Input extends Component {
  saveSearchString = debounce(() => {
    console.log('It works');
  }, 10000);

  render() {
    const {
      placeholder,
      searchString,
      onKeyDown,
      onInput,
      onBlur
    } = this.props;

    this.saveSearchString();
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
