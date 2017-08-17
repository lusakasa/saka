import { h, Component } from 'preact';
import './style.css';

export default class BackgroundImage extends Component {
  state = {
    screenshot: undefined
  }
  render () {
    const { children } = this.props;
    const { screenshot } = this.state;
    return (
      <div
        id='background-image'
        style={screenshot && `background-image: url("${screenshot}")`}
      >
        { children }
      </div>
    );
  }
  componentDidMount () {
    (async () => {
      const { screenshot } = await browser.storage.local.get('screenshot');
      this.setState({ screenshot });
      const { id } = await browser.tabs.getCurrent();
      await browser.tabs.update(id, { active: true });
      await browser.storage.local.remove('screenshot');
    })();
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
