import { h } from 'preact';
import Button from './Button';
import Input from './Input';
import 'scss/styles.scss';

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
  <section class="search-bar-container">
    <Button mode={mode} onClick={onButtonClick} />
    <Input
      placeholder={placeholder}
      searchString={searchString}
      suggestion={suggestion}
      onKeyDown={onKeyDown}
      onInput={onInput}
      onBlur={onBlur}
      autofocus
    />
  </section>
);
