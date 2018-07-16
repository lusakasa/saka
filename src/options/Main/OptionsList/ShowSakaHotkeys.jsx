import { h } from 'preact';


const ShowSakaHotkeys = function ShowSakaHotkeys({
  handleOpenSakaKeybindings
}) {
  return (
    <li className="option">
      <span className="">Saka Hotkeys</span>
      <i
        role="button"
        aria-pressed="false"
        aria-label="View Saka hotkeys"
        onClick={handleOpenSakaKeybindings}
      >
        keyboard
      </i>
    </li>
  );
};

export default ShowSakaHotkeys;
