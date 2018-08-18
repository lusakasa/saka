import { h } from 'preact';
import 'scss/styles.scss';
import Input from './Input/index.jsx';

export default ({
  placeholder,
  searchString,
  suggestion,
  onKeyDown,
  onInput,
  onBlur
}) => (
  <form className="search-bar-container">
    <Input
      placeholder={placeholder}
      searchString={searchString}
      suggestion={suggestion}
      onKeyDown={onKeyDown}
      onInput={onInput}
      onBlur={onBlur}
    />
  </form>
);
