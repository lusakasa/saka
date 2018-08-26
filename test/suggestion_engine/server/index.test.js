import {
  getSuggestions,
  activateSuggestion
} from 'suggestion_engine/server/index.js';
import * as providers from 'suggestion_engine/server/providers/index.js';

jest.mock('suggestion_engine/server/providers/index.js', () => ({
  tab: jest.fn().mockImplementation(() => [
    {
      type: 'tab'
    }
  ]),
  closedTab: jest.fn(),
  mode: jest.fn(),
  history: jest.fn(),
  bookmark: jest.fn(),
  recentlyViewed: jest.fn()
}));

test('should show all options when not showing key bindings', async () => {
  const mockexpectedResult = [
    {
      type: 'tab'
    }
  ];

  const suggestions = await getSuggestions(['tab', 'saka']);
  expect(suggestions).toEqual(mockexpectedResult);
});

test('should call appropriate activation methods', async () => {
  browser.flush();
  await activateSuggestion({
    type: 'tab'
  });
  expect(browser.tabs.update.calledOnce).toEqual(true);
  expect(browser.windows.update.calledOnce).toEqual(true);

  browser.flush();
  await activateSuggestion({
    type: 'closedTab'
  });
  expect(browser.sessions.restore.calledOnce).toEqual(true);

  browser.flush();
  await activateSuggestion({
    type: 'bookmark'
  });
  expect(browser.tabs.create.calledOnce).toEqual(true);

  browser.flush();
  await activateSuggestion({
    type: 'history'
  });
  expect(browser.tabs.create.calledOnce).toEqual(true);

  browser.flush();
  await activateSuggestion({
    type: 'recentlyViewed',
    originalType: 'tab'
  });
  expect(browser.tabs.update.calledOnce).toEqual(true);
});
