import { Component, h } from 'preact';
import OptionsList from './OptionsList';
import 'material-components-web/dist/material-components-web.css';
// import 'scss/options.scss';

export default class Main extends Component {
  render() {
    return (
      <div>
        <div class="mdc-list-group">
          <h3 class="mdc-list-group__subheader">List 1</h3>
        </div>
        <OptionsList />
      </div>
    );
  }
}
