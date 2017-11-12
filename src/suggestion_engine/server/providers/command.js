import { MAX_RESULTS } from './';

const commands = [
  'search',
  'help',
  'history',
  'tabs',
  'define'
];

export default function commandSuggestions (searchText) {
  return commands
    .filter((command) => command.startsWith(searchText))
    .slice(0, MAX_RESULTS)
    .map((command) => ({
      type: 'command',
      score: -1,
      title: command
    }));
}
