import { h } from 'preact';
import { ctrlChar } from 'lib/utils';
import './style.css';

export default ({
  firstVisibleIndex,
  suggestions,
  maxSuggestions,
  onClickPrevious,
  onClickNext
}) => {
  return suggestions.length === 0 ? (
    undefined
  ) : (
    <section id="pagination-bar">
      <div
        role="button"
        onClick={onClickPrevious}
        class="paginator-next-button"
      >
        <span class="arrow-normalizer">◄</span> {ctrlChar}-S
      </div>
      <div class="paginator-text-info">
        {`${firstVisibleIndex + 1} - ${firstVisibleIndex +
          Math.min(suggestions.length, maxSuggestions)} / ${
          suggestions.length
        }`}
      </div>
      <div role="button" onClick={onClickNext} class="paginator-next-button">
        {ctrlChar}-D ►
      </div>
    </section>
  );
};
