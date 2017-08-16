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
  onBlur,
  onButtonClick
}) => (
  <section class='search-bar-container'>
    <Input
      searchString={searchString}
      suggestion={suggestion}
      onKeyDown={onKeyDown}
      onInput={onInput}
      onBlur={onBlur}
      autofocus
    />
    <Button
      icon={icon}
      onClick={onButtonClick}
    />
  </section>
);
