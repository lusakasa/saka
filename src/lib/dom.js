
export function slowWheelEvent (threshold, onPositiveThreshold, onNegativeThreshold, value = 0) {
  return (e) => {
    e.preventDefault();
    value += e.deltaY;
    if (value >= threshold) {
      value = 0;
      onPositiveThreshold(e);
    } else if (value <= -threshold) {
      value = 0;
      onNegativeThreshold(e);
    }
  };
};
