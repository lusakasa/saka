import { h } from 'preact';
import { render, cleanup, flushPromises } from 'preact-testing-library';
import StandardSearch from '@/saka/Main/Containers/StandardSearch/index.jsx';

test('should be empty when no there is no search string provided', async () => {
  const props = {
    placeholder: 'Tabs',
    mode: 'tab',
    showEmptySearchSuggestions: true,
    searchHistory: []
  };
});

afterEach(cleanup);
