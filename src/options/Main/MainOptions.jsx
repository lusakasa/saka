import { Component, h } from 'preact';
import 'material-components-web/dist/material-components-web.css';
import 'scss/options.scss';

import OptionsList from './OptionsList/index.jsx';
import SakaHotkeysList from './SakaHotkeysList/index.jsx';

export default class MainOptions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSakaKeybindings: false
    };
  }

  handleOpenSakaKeybindings = () => {
    this.setState({
      showSakaKeybindings: !this.state.showSakaKeybindings
    });
  };

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
          {this.state.showSakaKeybindings ? (
            <SakaHotkeysList
              handleOpenSakaKeybindings={this.handleOpenSakaKeybindings}
            />
          ) : (
            <OptionsList
              handleOpenSakaKeybindings={this.handleOpenSakaKeybindings}
            />
          )}
        </div>
      </body>
    );
  }
}
