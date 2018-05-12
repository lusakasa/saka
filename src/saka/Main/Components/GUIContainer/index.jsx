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
                maxWidth: `${100 * zoom}%`
              }
        }
      >
        {children}
      </main>
    );
  }
}
