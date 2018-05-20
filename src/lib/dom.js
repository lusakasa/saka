export function slowWheelEvent(
  threshold,
  onPositiveThreshold,
  onNegativeThreshold,
  value = 0
) {
  return e => {
    e.preventDefault();
    let val = value;
    val += e.deltaY;
    if (val >= threshold) {
      val = 0;
      onPositiveThreshold(e);
    } else if (val <= -threshold) {
      val = 0;
      onNegativeThreshold(e);
    }
  };
}

/**
 * Return whether the cursor is at the far right end of the
 * provided HTML input
 * @param {HTMLInputElement} input
 */
export function cursorAtEnd(input) {
  return input && input.selectionStart === input.value.length;
}
