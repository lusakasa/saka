// this file is dynamically loaded by the event page into the active tab of the active window
// Search for an existing Saka
//   * if found, remove it
//   * if not found, create and show it

const oldSakaRoot = document.querySelector('#saka-root');
if (oldSakaRoot) {
  if (SAKA_DEBUG) {
    console.log('REMOVING SAKA');
  }
  oldSakaRoot.remove();
} else {
  console.log('APPENDING SAKA');
  // create container div
  const newSakaRoot = document.createElement('div');
  newSakaRoot.id = 'saka-root';
  newSakaRoot.style = (
  `position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 2147483647;
  opacity: 1;
  pointer-events: none;`);
  // create Saka iframe
  const iframe = document.createElement('iframe');
  iframe.id = 'saka';
  iframe.src = chrome.runtime.getURL('saka.html');
  iframe.style = (
  `z-index: 2147483647;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border-width: 0;
  pointer-events: all;
  }`
  );
  iframe.scroling = 'no';
  iframe.frameBorder = 0;
  // mount to DOM
  newSakaRoot.appendChild(iframe);
  document.documentElement.appendChild(newSakaRoot);
}
