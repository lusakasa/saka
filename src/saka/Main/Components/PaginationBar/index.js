import { h } from 'preact';
import { ctrlChar } from 'lib/utils';
import './style.css';

export default ({ firstVisibleIndex, suggestions, maxSuggestions }) => {
  return suggestions.length === 0
    ? undefined
    : (
      <section id='pagination-bar'>

        <div class='paginator-next-button'>
          <span class='arrow-normalizer'>◄</span>
          {ctrlChar}
        </div>
        <div class='paginator-text-info'>
          {`${firstVisibleIndex + 1} - ${firstVisibleIndex + Math.min(suggestions.length, maxSuggestions)} / ${suggestions.length}`}
        </div>
        <div class='paginator-next-button'>
          {ctrlChar}►
        </div>
      </section>
    );
};
