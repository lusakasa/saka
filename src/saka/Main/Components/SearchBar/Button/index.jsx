import { h, Component } from 'preact';
import { icons } from 'suggestion_utils/index.js';
import { colorMap, fadedColorMap } from 'lib/colors.js';

export default class extends Component {
  state = {
    hovered: false
  };

  handleMouseEnter = () => {
    this.setState({ hovered: true });
  };

  handleMouseLeave = () => {
    this.setState({ hovered: false });
  };

  render() {
    const { mode, onClick } = this.props;
    const { hovered } = this.state;
    const { handleMouseEnter, handleMouseLeave } = this;
    return (
      <div
        role="button"
        className="search-bar__button"
        onClick={onClick}
        onKeyPress={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        tabIndex={0}
      >
        <i
          className="search-bar__icon"
          style={{
            color: hovered ? colorMap.mode : fadedColorMap[mode]
          }}
        >
          {hovered ? icons.mode : icons[mode]}
        </i>
      </div>
    );
  }
}
