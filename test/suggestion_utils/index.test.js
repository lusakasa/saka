import { preprocessSuggestion } from '@/suggestion_utils/index.js';
import { colorMap, fadedColorMap } from 'lib/colors';
import * as url from 'lib/url.js';

test('should return suggestion with pretty URL when type is tab', () => {
  url.prettifyURL = jest
    .fn()
    .mockImplementation(() => 'https://github.com/lusakasa/saka');

  const suggestion = {
    type: 'tab',
    tabId: 0,
    windowId: 0,
    title: 'Saka',
    url: 'https://github.com/lusakasa/saka?stuffInUrl=true',
    favIconUrl: 'https://github.com/lusakasa/saka/icon.png',
    incognito: false,
    lastAccessed: 123.456,
    matches: [],
    score: undefined
  };
  const searchText = 'saka';
  const result = preprocessSuggestion(suggestion, searchText);
  expect(result).toEqual({
    ...suggestion,
    prettyURL: 'https://github.com/lusakasa/saka',
    text: suggestion.title
  });
});

test('should return suggestion with pretty URL when type is closedTab', () => {
  url.prettifyURL = jest
    .fn()
    .mockImplementation(() => 'https://github.com/lusakasa/saka');

  const suggestion = {
    type: 'closedTab',
    tabId: 1,
    title: 'Saka',
    url: 'https://github.com/lusakasa/saka?stuffInUrl=true',
    favIconUrl: 'https://github.com/lusakasa/saka/icon.png',
    sessionId: undefined,
    score: undefined,
    incognito: false,
    lastAccessed: 123456
  };
  const searchText = 'saka';
  const result = preprocessSuggestion(suggestion, searchText);
  expect(result).toEqual({
    ...suggestion,
    prettyURL: 'https://github.com/lusakasa/saka',
    text: suggestion.title
  });
});

test('should return suggestion when type is mode', () => {
  url.prettifyURL = jest.fn().mockImplementation(suggestion => suggestion);

  const suggestion = {
    type: 'mode',
    mode: 'tab',
    label: 'Tabs',
    shortcut: `ctrl-shift-a`,
    color: colorMap.tab,
    fadedColor: fadedColorMap.tab,
    icon: 'tab'
  };

  const searchText = 'saka';
  const result = preprocessSuggestion(suggestion, searchText);
  expect(result).toEqual(suggestion);
});

test('should return suggestion with pretty URL when type is bookmark', () => {
  url.prettifyURL = jest
    .fn()
    .mockImplementation(() => 'https://github.com/lusakasa/saka');

  const suggestion = {
    type: 'bookmark',
    score: -1,
    url: 'https://github.com/lusakasa/saka',
    title: 'Saka'
  };

  const searchText = 'saka';
  const result = preprocessSuggestion(suggestion, searchText);
  expect(result).toEqual({
    ...suggestion,
    prettyURL: 'https://github.com/lusakasa/saka',
    text: 'https://github.com/lusakasa/saka'
  });
});

test('should return suggestion with pretty URL when type is history', () => {
  url.prettifyURL = jest
    .fn()
    .mockImplementation(() => 'https://github.com/lusakasa/saka');

  const suggestion = {
    type: 'history',
    url: 'https://github.com/lusakasa/saka',
    title: 'Saka Github',
    lastAccessed: 1524795.334,
    score: 15
  };

  const searchText = 'saka';
  const result = preprocessSuggestion(suggestion, searchText);
  expect(result).toEqual({
    ...suggestion,
    prettyURL: 'https://github.com/lusakasa/saka',
    text: 'https://github.com/lusakasa/saka'
  });
});

test('should return suggestion with pretty URL when type is recentlyViewed', () => {
  url.prettifyURL = jest
    .fn()
    .mockImplementation(() => 'https://github.com/lusakasa/saka');

  const suggestion = {
    type: 'recentlyViewed',
    url: 'https://example.com',
    title: 'Example',
    lastAccessed: 1524794.2,
    score: 1,
    originalType: 'history'
  };

  const searchText = 'saka';
  const result = preprocessSuggestion(suggestion, searchText);
  expect(result).toEqual({
    ...suggestion,
    prettyURL: 'https://github.com/lusakasa/saka',
    text: 'https://github.com/lusakasa/saka'
  });
});

test('should return error when type is unexpected', () => {
  const suggestion = {
    type: 'adsknajksfnasjfnjas',
    url: 'https://example.com',
    title: 'Example',
    lastAccessed: 1524794.2,
    score: 1,
    originalType: 'history'
  };

  const searchText = 'saka';
  const result = preprocessSuggestion(suggestion, searchText);
  expect(result).toEqual({
    type: 'error',
    title: `Error. Unknown Suggestion type: ${suggestion.type}`,
    text: `Error. Unknown Suggestion type: ${suggestion.type}`
  });
});
