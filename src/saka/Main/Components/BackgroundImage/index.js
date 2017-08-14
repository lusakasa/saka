import { h, Component } from 'preact';
import './style.css';

export default class BackgroundImage extends Component {
  state = {
    image: undefined
  }
  render ({ children, suggestion }) {
    return (
      <div
        id='background-image'
        style={this.state.image && ''}
      >
        { children }
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
