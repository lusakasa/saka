const chrome = require('sinon-chrome/extensions');

import { h } from 'preact';
import { storiesOf } from '@storybook/react';
import SuggestionList from '../src/saka/Main/Components/SuggestionList/index';
import OptionsPage from '../src/options/Main';
import OptionsList from '../src/options/Main/OptionsList';
import DefaultModeSelection from '../src/options/Main/OptionsList/DefaultModeSelection';
import OnlyShowSearchBarSelector from '../src/options/Main/OptionsList/OnlyShowSearchBarSelector';

import { action } from '@storybook/addon-actions';
import { ctrlChar } from '../src/lib/utils';
import { colorMap, fadedColorMap } from '../src/lib/colors';

global.chrome = chrome;

storiesOf('SuggestionList', module)
  .add('with no entries', () => {
    const suggestions = [];

    const searchString = {};
    return (
      <SuggestionList
        searchString={searchString}
        suggestions={suggestions}
        selectedIndex={0}
        firstVisibleIndex={0}
        maxSuggestions={5}
        onSuggestionClick={action('button-click')}
      />
    );
  })
  .add('with tab entries', () => {
    const suggestions = [
      {
        type: 'tab',
        title: 'lusakasa/saka: Elegant tab search',
        url: 'https://github.com/lusakasa/saka',
        prettyURL: 'Saka'
      },
      {
        type: 'tab',
        title: 'Google',
        url: 'https://google.com',
        prettyURL: 'Google'
      }
    ];

    const searchString = {};
    return (
      <SuggestionList
        searchString={searchString}
        suggestions={suggestions}
        selectedIndex={0}
        firstVisibleIndex={0}
        maxSuggestions={5}
        onSuggestionClick={action('button-click')}
      />
    );
  })
  .add('with bookmark entries', () => {
    const suggestions = [
      {
        type: 'bookmark',
        title: 'lusakasa/saka: Elegant tab search',
        url: 'https://github.com/lusakasa/saka',
        prettyURL: 'Saka'
      },
      {
        type: 'bookmark',
        title: 'Google',
        url: 'https://google.com',
        prettyURL: 'Google'
      }
    ];

    const searchString = {};
    return (
      <SuggestionList
        searchString={searchString}
        suggestions={suggestions}
        selectedIndex={0}
        firstVisibleIndex={0}
        maxSuggestions={5}
        onSuggestionClick={action('button-click')}
      />
    );
  })
  .add('with mode entries', () => {
    const suggestions = [
      {
        type: 'mode',
        mode: 'tab',
        label: 'Tabs',
        shortcut: `${ctrlChar}-shift-A`,
        color: colorMap.tab,
        fadedColor: fadedColorMap.tab,
        icon: 'tab'
      },
      {
        type: 'mode',
        mode: 'closedTab',
        label: 'Recently Closed Tabs',
        shortcut: `${ctrlChar}-shift-C`,
        color: colorMap.closedTab,
        fadedColor: fadedColorMap.closedTab,
        icon: 'restore_page'
      }
    ];

    const searchString = {};
    return (
      <SuggestionList
        searchString={searchString}
        suggestions={suggestions}
        selectedIndex={0}
        firstVisibleIndex={0}
        maxSuggestions={5}
        onSuggestionClick={action('button-click')}
      />
    );
  });

storiesOf('OptionsPage', module)
  .add('Show empty search enabled', () => {
    chrome.storage.sync.get.yields({
      sakaSettings: {
        mode: 'tab',
        showEmptySearchSuggestions: true
      }
    });

    return <OptionsPage />;
  })
  .add('Show empty search disabled', () => {
    chrome.storage.sync.get.yields({
      sakaSettings: {
        mode: 'tab',
        showEmptySearchSuggestions: false
      }
    });

    return <OptionsPage />;
  });

storiesOf('DefaultModeSelection', module).add('Default render', () => {
  const props = {
    mode: 'bookmark',
    handleModeChange() {}
  };
  return <DefaultModeSelection {...props} />;
});

storiesOf('OnlyShowSearchBarSelector', module)
  .add('Suggestions on load enabled', () => {
    const props = {
      checked: true,
      handleShowSearchSuggestionsChange() {}
    };
    return <OnlyShowSearchBarSelector {...props} />;
  })
  .add('Suggestions on load disabled', () => {
    const props = {
      checked: false,
      handleShowSearchSuggestionsChange() {}
    };
    return <OnlyShowSearchBarSelector {...props} />;
  });
