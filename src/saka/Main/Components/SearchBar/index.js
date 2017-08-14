import { h } from 'preact';
import Button from './Button';
import Input from './Input';
import './style.css';

export default ({
  searchString,
  suggestion,
  icon,
  onKeyDown,
  onInput,
  onBlur
}) => (
  <section class='search-bar-container'>
    <Input
      searchString={searchString}
      suggestion={suggestion}
      onKeyDown={onKeyDown}
      onInput={onInput}
      onBlur={onBlur}
    />
    <Button
      icon={icon}
    />
  </section>
);
