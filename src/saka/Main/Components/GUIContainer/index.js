import { h, Component } from 'preact';
import './style.css';

// Makes GUI constant size
// TODO: figure out why saka shrinks when zoomed on small viewports

export default class GUIContainer extends Component {
  state = {
    zoom: 0
  }
  render () {
    const { children } = this.props;
    const { zoom } = this.state;
    // opacity: 0.01 is just a trick to hide the component and not prevent it from
    // from rendering/mounting in the DOM, which would preven the search bar from focusing
    return (
      <main id='GUIContainer' style={
        zoom === 0
          ? { opacity: 0.01 }
          : { transform: `scale(calc(1/${zoom}))` }
      }>
        { children }
      </main>
    );
  }
  componentWillMount () {
    (async () => {
      const { id } = await browser.tabs.getCurrent();
      const zoom = await browser.tabs.getZoom(id);
      this.setState({ zoom });
    })();
    browser.tabs.onZoomChange.addListener(({ newZoomFactor }) => {
      this.setState({ zoom: newZoomFactor });
    });
  }
}
