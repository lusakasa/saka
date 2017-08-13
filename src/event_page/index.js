import 'lib/browser_polyfill';

chrome.browserAction.onClicked.addListener((tab) => {
  toggleSakaBar();
});

chrome.commands.onCommand.addListener((command) => {
  switch (command) {
    case 'toggleSakaBar':
    case 'toggleSakaBar2':
    case 'toggleSakaBar3':
    case 'toggleSakaBar4':
      toggleSakaBar();
      break;
    default:
      console.error(`Unknown command: '${command}'`);
  }
});

chrome.runtime.onMessage.addListener((message) => {
  switch (message) {
    case 'toggleSakaBar':
      toggleSakaBar();
      break;
    default:
      console.error(`Unknown message: '${message}'`);
  }
});

let lastTabId;

async function toggleSakaBar () {
  const [currentTab] = await browser.tabs.query({
    active: true,
    currentWindow: true
  });
  if (currentTab) {
    if (currentTab.url === 'chrome-extension://codmmifoppafgbpinhbbijbilkhjlflf/sakabar.html') {
      if (lastTabId) {
        const lastTabExists = (await browser.tabs.get(lastTabId));
        if (lastTabExists) {
          browser.tabs.update(lastTabId, { active: true });
        }
        lastTabId = undefined;
      }
      browser.tabs.remove(currentTab.id);
    } else {
      try {
        await browser.tabs.executeScript({
          file: '/toggle_sakabar.js',
          runAt: 'document_start',
          matchAboutBlank: true
        });
      } catch (e) {
        lastTabId = currentTab.id;
        await browser.tabs.create({
          url: '/sakabar.html',
          index: currentTab.index + 1
        });
      }
    }
  } else { // no current tab, likely devtools
    await browser.tabs.create({
      url: '/sakabar.html'
    });
  }
}
