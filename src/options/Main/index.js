import { Component, h } from 'preact';
import OptionsList from './OptionsList';
import 'material-components-web/dist/material-components-web.css';
import 'scss/options.scss';

export default class Main extends Component {
  render() {
    return (
      <body>
        <header className="mdc-top-app-bar mdc-top-app-bar--short">
          <div className="mdc-top-app-bar__row">
            <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
              <span className="mdc-top-app-bar__title">Saka Options</span>
            </section>
          </div>
        </header>
        <div
          id="background-image"
          className="mdc-elevation--z1 options-container"
        >
          <OptionsList />
        </div>
      </body>
    );
  }
}
