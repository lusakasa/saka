import Icon from '../src/saka/Main/Components/Icon/index.jsx';
import { render } from 'preact-render-spy';
import { h } from 'preact';

describe('Icon component ', () => {
  it('should render while enabled', () => {
    const props = {
      icon: '',
      color: 'rgba(1,1,1,0.44)'
    };

    const iconRender = render(<Icon {...props} />);
    const icon = iconRender.find('#icon');

    expect(icon).toBeTruthy();
  });
});
