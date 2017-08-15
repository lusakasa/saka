import 'lib/browser_polyfill';

chrome.browserAction.onClicked.addListener((tab) => {
  toggleSaka();
});

chrome.commands.onCommand.addListener((command) => {
  switch (command) {
    case 'toggleSaka':
    case 'toggleSaka2':
    case 'toggleSaka3':
    case 'toggleSaka4':
      toggleSaka();
      break;
    default:
      console.error(`Unknown command: '${command}'`);
  }
});

chrome.runtime.onMessage.addListener((message, sender) => {
  switch (message) {
    case 'toggleSaka':
      toggleSaka();
      break;
    case 'closeSaka':
      closeSaka(sender.tab);
      break;
    default:
      console.error(`Unknown message: '${message}'`);
  }
});

let lastTabId;

async function toggleSaka (tabId) {
  if (SAKA_DEBUG) console.group('toggleSaka');
  // Get the specified tab, or the current tab if none is specified
  const currentTab = tabId === undefined
    ? (await browser.tabs.query({
      active: true,
      currentWindow: true
    }))[0]
    : await browser.tabs.get(tabId);
  if (currentTab) {
    // If the current tab is Saka, switch to the previous tab (if it exists) and close the current tab
    if (currentTab.url === browser.runtime.getURL('saka.html')) {
      if (lastTabId) {
        const lastTab = (await browser.tabs.get(lastTabId));
        if (lastTab) {
          await browser.tabs.update(lastTabId, { active: true });
          if (SAKA_DEBUG) console.log(`Switched to tab ${lastTab.url}`);
        }
        lastTabId = undefined;
      }
      await browser.tabs.remove(currentTab.id);
      if (SAKA_DEBUG) console.log(`Removed tab ${currentTab.url}`);
    // Otherwise, try to load Saka into the current tab
    } else {
      try {
        await browser.tabs.executeScript(currentTab.id, {
          file: '/toggle_saka.js',
          runAt: 'document_start',
          matchAboutBlank: true
        });
        if (SAKA_DEBUG) console.log(`Loaded Saka into tab ${currentTab.url}`);
      // If loading Saka into the current tab fails, create a new tab
      } catch (e) {
        lastTabId = currentTab.id;
        await browser.tabs.create({
          url: '/saka.html',
          index: currentTab.index + 1
        });
        if (SAKA_DEBUG) console.log(`Failed to execute Saka into tab. Instead, created new Saka tab after ${currentTab.url}`);
      }
    }
  // If tab couldn't be found (e.g. because query was made from devtools) create a new tab
  } else {
    await browser.tabs.create({
      url: '/saka.html'
    });
    if (SAKA_DEBUG) console.log("Couldn't find tab. Instead, created new Saka tab.");
  }
  const window = await browser.windows.getLastFocused();
  await browser.windows.update(window.id, { focused: true });
  console.groupEnd();
}

async function closeSaka (tab) {
  if (tab) {
    if (tab.url === browser.runtime.getURL('saka.html')) {
      await browser.tabs.remove(tab.id);
    } else {
      await browser.tabs.executeScript(tab.id, {
        file: '/toggle_saka.js',
        runAt: 'document_start',
        matchAboutBlank: true
      });
    }
  }
}
