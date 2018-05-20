import knownTLDs from './tld.js';
/**
 * Given the URL of a suggestion and the search text, makes the URL nicer
 * @param {string} url - the suggestion URL
 * @param {string} searchString - the text in the search bar
 */
export function prettifyURL(url, searchString) {
  let prettifiedUrl = url;
  if (url.endsWith('/')) {
    prettifiedUrl = url.substr(0, url.length - 1);
  }

  // TODO add support for any protocol
  if (
    !searchString.startsWith('http://') &&
    prettifiedUrl.startsWith('http://')
  ) {
    prettifiedUrl = prettifiedUrl.substr(7);
  }
  return prettifiedUrl;
}

/**
 * Returns true only if str is a valid url
 * @param {string} str
 */
export function isURL(str) {
  let isValidUrl;

  try {
    isValidUrl = Boolean(new URL(str));
  } catch (e) {
    isValidUrl = false;
  }
  return isValidUrl;
}

export function extractProtocol(url) {
  if (url) {
    return url.match(/^\w+:/, '') ? url.match(/^\w+:/, '')[0] : '';
  }

  return '';
}

export function stripProtocol(url) {
  return url.replace(/(^\w+:|^)\/\//, '');
}

export function stripWWW(url) {
  return url.replace(/^www\./, '');
}

export function startsWithProtocol(str) {
  return str.match(/(^\w+:|^)\/\//) !== null;
}

export function startsWithWWW(str) {
  return str.match(/^www\./, '') !== null;
}

/** Returns whether the provided text is a known TLD (top-level domain) */
export function isTLD(text) {
  return knownTLDs.indexOf(text) !== -1;
}

const knownProtocols = [
  'http:',
  'https:',
  'file:',
  'ftp:',
  'about:',
  'chrome:',
  'chrome-extension:',
  'moz-extension:'
];
/** Returns whether the provided text is a known protocol */
export function isProtocol(text) {
  return knownProtocols.indexOf(text) !== -1;
}

export function isLikeURL(url) {
  let trimmedUrl = url.trim();
  if (trimmedUrl.indexOf(' ') !== -1) {
    return false;
  }
  if (trimmedUrl.search(/^(about|file):[^:]/) !== -1) {
    return true;
  }
  const protocol = (trimmedUrl.match(/^([a-zA-Z-]+:)[^:]/) || [''])[0].slice(
    0,
    -1
  );
  const protocolMatch = isProtocol(protocol);
  if (protocolMatch) {
    trimmedUrl = trimmedUrl.replace(/^[a-zA-Z-]+:\/*/, '');
  }
  const hasPath = /.*[a-zA-Z].*\//.test(trimmedUrl);
  trimmedUrl = trimmedUrl.replace(/(:[0-9]+)?([#/].*|$)/g, '').split('.');
  if (protocolMatch && /^[a-zA-Z0-9@!]+$/.test(trimmedUrl)) {
    return true;
  }

  if (protocol && !protocolMatch && protocol !== 'localhost:') {
    return false;
  }
  // IP addresses
  const isIP = trimmedUrl.every(e => /^[0-9]+$/.test(e) && +e >= 0 && +e < 256);
  if (
    (isIP && !protocol && trimmedUrl.length === 4) ||
    (isIP && protocolMatch)
  ) {
    return true;
  }
  return (
    (trimmedUrl.every(e => /^[a-z0-9-]+$/i.test(e)) &&
      (trimmedUrl.length > 1 && isTLD(trimmedUrl[trimmedUrl.length - 1]))) ||
    (trimmedUrl.length === 1 && trimmedUrl[0] === 'localhost') ||
    hasPath
  );
}

export async function isSakaUrl(url) {
  if (url !== undefined) {
    const sakaUrl = browser.runtime.getURL('saka.html');
    const sakaId = sakaUrl.substring(0, sakaUrl.indexOf('/'));
    return url.includes(sakaId);
  }

  return false;
}
