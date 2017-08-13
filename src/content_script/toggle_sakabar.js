// this file is dynamically loaded by the event page into the active tab of the active window
// Search for an existing Saka Bar
//   * if found, remove it
//   * if not found, create and show it

const oldSakaBarRoot = document.querySelector('#saka-bar-root');
if (oldSakaBarRoot) {
  oldSakaBarRoot.remove();
} else {
  // create container div
  const newSakaBarRoot = document.createElement('div');
  newSakaBarRoot.id = 'saka-bar-root';
  newSakaBarRoot.style = (
  `position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 2147483647;
  opacity: 1;
  pointer-events: none;`);
  // create SakaBar iframe
  const iframe = document.createElement('iframe');
  iframe.id = 'sakabar';
  iframe.src = chrome.runtime.getURL('sakabar.html');
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
  newSakaBarRoot.appendChild(iframe);
  document.documentElement.appendChild(newSakaBarRoot);
}
