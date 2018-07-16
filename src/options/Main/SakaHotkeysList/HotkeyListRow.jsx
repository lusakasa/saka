import { h } from 'preact';

const HotkeyListRow = function HotkeyListRow({ title, keys }) {
  const hotkeyShortcut = keys.map((key, index, keysArray) => (
    <span>
      <kbd>{key}</kbd>
      {keysArray.length === index + 1 ? '' : '+'}
    </span>
  ));
  return (
    <li className="option">
      <span className="">{title}</span>
      <div className="">{hotkeyShortcut}</div>
    </li>
  );
};

export default HotkeyListRow;
