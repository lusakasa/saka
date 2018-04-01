import { h } from 'preact';
import { storiesOf } from '@storybook/react';
import SuggestionList from '../src/saka/Main/Components/SuggestionList/index';
import { action } from '@storybook/addon-actions';
import { ctrlChar } from '../src/lib/utils';
import { colorMap, fadedColorMap } from '../src/lib/colors';

storiesOf('SuggestionList', module)
  .add('with no entries', () => {
    let suggestions = [];

    let searchString = {};
    return (
      <SuggestionList searchString={searchString} suggestions={suggestions}
        selectedIndex={0} firstVisibleIndex={0} maxSuggestions={5}
        onSuggestionClick={action('button-click')} />);
  })
  .add('with tab entries', () => {
    let suggestions = [
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
      }];

    let searchString = {};
    return (
      <SuggestionList searchString={searchString} suggestions={suggestions}
        selectedIndex={0} firstVisibleIndex={0} maxSuggestions={5}
        onSuggestionClick={action('button-click')} />);
  })
  .add('with bookmark entries', () => {
    let suggestions = [
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
      }];

    let searchString = {};
    return (
      <SuggestionList searchString={searchString} suggestions={suggestions}
        selectedIndex={0} firstVisibleIndex={0} maxSuggestions={5}
        onSuggestionClick={action('button-click')} />);
  })
  .add('with mode entries', () => {
    let suggestions = [
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

    let searchString = {};
    return (
      <SuggestionList searchString={searchString} suggestions={suggestions}
        selectedIndex={0} firstVisibleIndex={0} maxSuggestions={5}
        onSuggestionClick={action('button-click')} />);
  });

