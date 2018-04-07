import knownTLDs from './tld';
/**
 * Given the URL of a suggestion and the search text, makes the URL nicer
 * @param {string} url - the suggestion URL
 * @param {string} searchString - the text in the search bar
 */
export function prettifyURL(url, searchString) {
  if (url.endsWith('/')) {
    url = url.substr(0, url.length - 1);
  }

  // TODO add support for any protocol
  if (!searchString.startsWith('http://') && url.startsWith('http://')) {
    url = url.substr(7);
  }
  return url;
}

/**
 * Returns true only if str is a valid url
 * @param {string} str
 */
export function isURL(str) {
  try {
    new URL(str);
  } catch (e) {
    return false;
  }
  return true;
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

export function isLikeURL(url) {
  url = url.trim();
  if (url.indexOf(' ') !== -1) {
    return false;
  }
  if (url.search(/^(about|file):[^:]/) !== -1) {
    return true;
  }
  const protocol = (url.match(/^([a-zA-Z-]+:)[^:]/) || [''])[0].slice(0, -1);
  const protocolMatch = isProtocol(protocol);
  if (protocolMatch) {
    url = url.replace(/^[a-zA-Z-]+:\/*/, '');
  }
  const hasPath = /.*[a-zA-Z].*\//.test(url);
  url = url.replace(/(:[0-9]+)?([#/].*|$)/g, '').split('.');
  if (protocolMatch && /^[a-zA-Z0-9@!]+$/.test(url)) {
    return true;
  }
  if (protocol && !protocolMatch && protocol !== 'localhost:') {
    return false;
  }
  // IP addresses
  const isIP = url.every(e => /^[0-9]+$/.test(e) && +e >= 0 && +e < 256);
  if ((isIP && !protocol && url.length === 4) || (isIP && protocolMatch)) {
    return true;
  }
  return (
    (url.every(e => /^[a-z0-9-]+$/i.test(e)) &&
      (url.length > 1 && isTLD(url[url.length - 1]))) ||
    (url.length === 1 && url[0] === 'localhost') ||
    hasPath
  );
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
  'chrome-extension:'
];
/** Returns whether the provided text is a known protocol */
export function isProtocol(text) {
  return knownProtocols.indexOf(text) !== -1;
}
