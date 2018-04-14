export function rangedIncrement(value, increment, min, max) {
  const result = value + increment;
  return result < min ? min : result > max ? max : result;
}

export const isMac = navigator.appVersion.indexOf('Mac') !== -1;
export const ctrlChar = isMac ? '⌘' : 'ctrl';

/**
 * @param {KeyboardEvent} e
 */
export function ctrlKey(e) {
  return isMac ? e.metaKey : e.ctrlKey;
}

export function objectFromArray(array, key) {
  const out = {};
  array.forEach(e => {
    out[e[key]] = e;
  });
  return out;
}
