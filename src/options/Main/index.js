import { Component, h } from 'preact';
import OptionsList from './OptionsList';
import 'material-components-web/dist/material-components-web.css';
import 'scss/options.scss';

export default class Main extends Component {
  render() {
    return (
      <div
        id="background-image"
        style="background-color: #ffffff;
        margin: auto;
        position: relative;
        text-align: center;
        top: 50%;
        width: 40%;"
      >
        <OptionsList />
      </div>
    );
  }
}
