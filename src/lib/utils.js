
export function rangedIncrement (value, increment, min, max) {
  const result = value + increment;
  return result < min
    ? min
    : result > max
      ? max
      : result;
}

export const isMac = navigator.appVersion.indexOf('Mac') !== -1;
