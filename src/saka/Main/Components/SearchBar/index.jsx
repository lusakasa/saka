import { h } from 'preact';
import 'scss/styles.scss';
import Button from './Button/index.jsx';
import Input from './Input/index.jsx';

export default ({
  placeholder,
  searchString,
  suggestion,
  mode,
  onKeyDown,
  onInput,
  onBlur,
  onButtonClick
}) => (
  <form className="search-bar-container">
    <Button mode={mode} onClick={onButtonClick} />
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
