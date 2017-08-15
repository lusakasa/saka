import { h } from 'preact';
import '@material/button/dist/mdc.button.min.css';

import './style.css';

// 1. Reload
// 2. Search
// 3. History
// 4. Calculate
// 5. Activate
// 6. Go
// 7. Command

// function icon (searchText, searchValue, tabURL, modifiers) {
//   return searchText === tabURL
//     ? 'refresh'
//     : iconForType[isURL(searchValue) ? 'url' : 'search'];
// }

export default ({ icon, onClick}) => (
  <div
    role='button'
    id='action-button'
    onClick={onClick}
  >
    <i class='material-icons' aria-hidden='true'> { icon }</i>
  </div>
);
