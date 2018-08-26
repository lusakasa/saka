import PaginationBar from '@/saka/Main/Components/PaginationBar/index.jsx';
import { render, getByText } from 'preact-testing-library';
import { h } from 'preact';

describe('PaginationBar component ', () => {
  it('should be empty when no there are no suggestions', () => {
    const props = {
      firstVisibleIndex: 0,
      suggestions: [],
      maxSuggestions: 6,
      onClickPrevious() {},
      onClickNext() {}
    };

    const { queryByText } = render(<PaginationBar {...props} />);
    expect(queryByText('◄')).toBeNull();
    expect(queryByText('ctrl-S')).toBeNull();
    expect(queryByText('ctrl-D ►')).toBeNull();
  });

  it('should show correct amount of suggestions when there are suggestions found', () => {
    const props = {
      firstVisibleIndex: 0,
      suggestions: [
        {
          type: 'tab',
          title: 'lusakasa/saka: Elegant tab search',
          url: 'https://github.com/lusakasa/saka'
        },
        {
          type: 'tab',
          title: 'Google',
          url: 'https://google.com'
        }
      ],
      maxSuggestions: 6,
      onClickPrevious() {},
      onClickNext() {}
    };

    const { getByText } = render(<PaginationBar {...props} />);
    getByText('◄');
    getByText('ctrl-S');
    getByText('1 - 2 / 2');
    getByText('ctrl-D ►');
  });
});
