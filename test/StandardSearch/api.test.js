import { h } from 'preact';
import { fireEvent } from 'preact-testing-library';
import api from '@/saka/Main/Containers/StandardSearch/api.js';

describe('getPreviousSearchString', () => {
  test('should return the same item in searchHistory when undoIndex = 0', async () => {
    const undoIndex = 0;
    const searchHistory = new Set(['test', 'history']);
    const result = api.getPreviousSearchString(undoIndex, searchHistory);
    expect(result).toEqual({
      searchString: 'test',
      undoIndex: 0
    });
  });

  test('should return previous item in searchHistory when undoIndex > 0', async () => {
    const undoIndex = 1;
    const searchHistory = new Set(['test', 'history']);
    const result = api.getPreviousSearchString(undoIndex, searchHistory);
    expect(result).toEqual({
      searchString: 'history',
      undoIndex: 0
    });
  });
});

describe('updateAutocompleteSuggestions', () => {
  test('should not provide autocomplete suggestion when search now is different from search at lookup', async () => {
    const suggestions = [];
    const searchStringAtLookup = '123';
    const searchStringNow = 'abc';
    const result = api.updateAutocompleteSuggestions(
      suggestions,
      searchStringAtLookup,
      searchStringNow
    );
    expect(result).toEqual({});
  });

  test('should provide no suggestion when search now is the same as search at lookup and suggestions empty', async () => {
    const suggestions = [];
    const searchStringAtLookup = '123';
    const searchStringNow = '123';
    const result = api.updateAutocompleteSuggestions(
      suggestions,
      searchStringAtLookup,
      searchStringNow
    );
    expect(result).toEqual({
      firstVisibleIndex: 0,
      selectedIndex: 0,
      suggestions: []
    });
  });

  test('should provide autocomplete suggestion when search now is the same as search at lookup and suggestions not empty', async () => {
    const suggestions = [
      {
        type: 'bookmark',
        score: -1,
        url: 'https://google.com',
        title: 'Google'
      }
    ];
    const searchStringAtLookup = 'google';
    const searchStringNow = 'google';
    const result = api.updateAutocompleteSuggestions(
      suggestions,
      searchStringAtLookup,
      searchStringNow
    );
    expect(result).toEqual({
      firstVisibleIndex: 0,
      selectedIndex: 0,
      suggestions: [
        {
          type: 'bookmark',
          score: -1,
          url: 'https://google.com',
          title: 'Google',
          prettyURL: 'https://google.com',
          text: 'https://google.com'
        }
      ]
    });
  });
});

describe('getEventHandler', () => {
  beforeEach(() => {
    global.browser = {
      runtime: {
        sendMessage: jest.fn()
      }
    };
  });
  test('should return close Saka function when event is ESC key', async () => {
    const event = new KeyboardEvent('escape', { key: 'Escape' });
    const eventHandler = api.getEventHandler(event);

    const searchHistory = new Set(['test', 'history']);
    eventHandler(searchHistory);
    expect(global.browser.runtime.sendMessage.mock.calls.length).toBe(1);
    expect(global.browser.runtime.sendMessage.mock.calls[0]).toEqual([
      {
        key: 'closeSaka',
        searchHistory: [...searchHistory]
      }
    ]);
  });

  test('should return close Saka function when event is Backspace key', async () => {
    const event = {
      key: 'Backspace',
      repeat: false,
      target: { value: '' }
    };

    const eventHandler = api.getEventHandler(event);

    const searchHistory = new Set(['test', 'history']);
    eventHandler(searchHistory);
    expect(global.browser.runtime.sendMessage.mock.calls.length).toBe(1);
    expect(global.browser.runtime.sendMessage.mock.calls[0]).toEqual([
      {
        key: 'closeSaka',
        searchHistory: [...searchHistory]
      }
    ]);
  });

  test('should return close Saka function when event is Arrow DOWN key', async () => {
    const event = new KeyboardEvent('arrowDown', { key: 'ArrowDown' });
    const eventHandler = api.getEventHandler(event);

    const updateSearchHistory = jest.fn();
    const incrementSelectedIndex = jest.fn();
    const searchString = 'test';
    eventHandler(updateSearchHistory, incrementSelectedIndex, searchString);
    expect(updateSearchHistory.mock.calls.length).toBe(1);
    expect(incrementSelectedIndex.mock.calls.length).toBe(1);
  });
});
