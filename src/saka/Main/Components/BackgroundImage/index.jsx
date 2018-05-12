import { h, Component } from 'preact';
import msg from 'msg/client.js';
import 'scss/styles.scss';

export default class BackgroundImage extends Component {
  state = {
    screenshot: undefined
  };

  componentDidMount() {
    (async () => {
      const { screenshot } = await browser.storage.local.get('screenshot');
      this.setState({ screenshot });
      await msg('focusTab');
      await browser.storage.local.remove('screenshot');
    })();
  }

  render() {
    const { children } = this.props;
    const { screenshot } = this.state;
    return (
      <div
        id="background-image"
        style={screenshot && `background-image: url("${screenshot}")`}
      >
        {children}
      </div>
    );
  }

  // componentWillReceiveProps (nextProps) {
  //   if (nextProps.suggestion.tabId !== this.props.suggestion.tabId) {
  //     this.fetchImage(nextProps.suggestion.tabId);
  //   }
  // }
  // shouldComponentUpdate (nextProps, nextState) {
  //   return nextState.image !== this.state.image;
  // }
  // fetchImage = async () => {

  // }
}
