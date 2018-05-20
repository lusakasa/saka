import { h } from 'preact';
import { ctrlChar } from 'lib/utils.js';
import 'scss/styles.scss';

export default ({
  firstVisibleIndex,
  suggestions,
  maxSuggestions,
  onClickPrevious,
  onClickNext
}) =>
  suggestions.length === 0 ? (
    undefined
  ) : (
    <section id="pagination-bar">
      <div
        role="button"
        onClick={onClickPrevious}
        onKeyPress={onClickPrevious}
        className="paginator-next-button"
        tabIndex={0}
      >
        <span className="arrow-normalizer">◄</span> {ctrlChar}-S
      </div>
      <div className="paginator-text-info">
        {`${firstVisibleIndex + 1} - ${firstVisibleIndex +
          Math.min(suggestions.length, maxSuggestions)} / ${
          suggestions.length
        }`}
      </div>
      <div
        role="button"
        onClick={onClickNext}
        onKeyPress={onClickNext}
        className="paginator-next-button"
        tabIndex={0}
      >
        {ctrlChar}-D ►
      </div>
    </section>
  );
