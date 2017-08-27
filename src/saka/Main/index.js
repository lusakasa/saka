import { Component, h } from 'preact';
import StandardSearch from './Containers/StandardSearch';
import './style.css';
import { tabModeSuggestions } from 'modes/tab';
import { modeModeSuggestions } from 'modes/mode';
import { closedTabModeSuggestions } from 'modes/closedTab';

export default class Main extends Component {
  state = {
    mode: 'tab',
    modes: ['mode', 'tab', 'closedTab']
  }
  render () {
    const { mode } = this.state;
    const { setMode, shuffleMode } = this;
    switch (mode) {
      case 'mode': return (
        <StandardSearch
          mode={mode}
          placeholder='Modes'
          setMode={setMode}
          shuffleMode={shuffleMode}
          getSuggestions={modeModeSuggestions}
        />);
      case 'tab': return (
        <StandardSearch
          mode={mode}
          placeholder='Tabs'
          setMode={setMode}
          shuffleMode={shuffleMode}
          getSuggestions={tabModeSuggestions}
        />
      );
      case 'closedTab': return (
        <StandardSearch
          mode={mode}
          placeholder='Recently Closed Tabs'
          setMode={setMode}
          shuffleMode={shuffleMode}
          getSuggestions={closedTabModeSuggestions}
        />
      );
      default:
        return <div>Error, invalid mode</div>;
    }
  }
  setMode = (mode) => {
    this.setState({ mode });
  }
  shuffleMode = () => {
    const { mode, modes } = this.state;
    const nextIndex = modes.indexOf(mode) + 1;
    const nextModeIndex = nextIndex >= modes.length ? 0 : nextIndex;
    this.setMode(modes[nextModeIndex]);
  }
}
