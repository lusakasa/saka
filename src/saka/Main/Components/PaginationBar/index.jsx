import { h } from 'preact';
import { ctrlChar } from 'lib/utils.js';

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
    <section className="pagination-bar">
      <div
        role="button"
        onClick={onClickPrevious}
        onKeyPress={onClickPrevious}
        className="pagination-bar__button"
        tabIndex={0}
      >
        <span className="pagination-bar__left-arrow">◄</span> {ctrlChar}-S
      </div>
      <div className="pagination-bar__info">
        {`${firstVisibleIndex + 1} - ${firstVisibleIndex +
          Math.min(suggestions.length, maxSuggestions)} / ${
          suggestions.length
        }`}
      </div>
      <div
        role="button"
        onClick={onClickNext}
        onKeyPress={onClickNext}
        className="pagination-bar__button"
        tabIndex={0}
      >
        {ctrlChar}-D ►
      </div>
    </section>
  );
