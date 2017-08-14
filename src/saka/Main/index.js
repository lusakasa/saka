import { Component, h } from 'preact';
import TabSearch from './Containers/TabSearch';
import GeneralSearch from './Containers/GeneralSearch';
import './style.css';

export default class Main extends Component {
  state = {
    mode: 'tab'
  }
  render () {
    const { mode } = this.state;
    switch (mode) {
      case 'tab':
        return <TabSearch />;
      default:
        return <GeneralSearch />;
    }
  }
}
