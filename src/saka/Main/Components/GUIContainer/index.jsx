import { h, Component } from 'preact';
import msg from 'msg/client.js';
import 'scss/styles.scss';

// Makes GUI constant size
export default class GUIContainer extends Component {
  state = {
    zoom: 0
  };

  componentWillMount() {
    window.addEventListener('zoom', this.onZoomChange);
    msg('zoom').then(this.setZoom);
  }

  componentWillUnmount() {
    window.removeEventListener('zoom', this.onZoomChange);
  }

  onZoomChange = event => {
    this.setZoom(event.detail.zoom);
  };

  setZoom = zoom => {
    this.setState({ zoom });
  };

  render() {
    const { children, onWheel } = this.props;
    const { zoom } = this.state;
    // opacity: 0.01 is just a trick to hide the component and not prevent it from
    // from rendering/mounting in the DOM, which would preven the search bar from focusing
    return (
      <main
        id="GUIContainer"
        onWheel={onWheel}
        style={
          zoom === 0
            ? {
                opacity: '0.01'
              }
            : {
                transform: `translateX(-50%) scale(${1 / zoom})`, // firefox can't handle calculated css scale props
                maxWidth: `${100 * zoom}%`,
                top: `${Math.max(0, (window.innerHeight - 504 / zoom) / 2)}px`
                // WARNING: 504 is the height of the GUI container with all 6 suggestions in pixels at the default zoom
                // This may change in future updates, so the constant will have to be updated accordingly
                // TODO: on each extension update, calculate the height of the Saka GUI with all 6 suggestions
                // and use that instead of the constant 504
              }
        }
      >
        {children}
      </main>
    );
  }
}
