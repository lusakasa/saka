import 'lib/browser_polyfill';
import 'msg/server';
import { tabHistory } from './tabHistory';

window.tabHistory = tabHistory;

chrome.browserAction.onClicked.addListener(tab => {
  toggleSaka();
});

chrome.commands.onCommand.addListener(command => {
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

chrome.runtime.onMessageExternal.addListener(message => {
  switch (message) {
    case 'toggleSaka':
      toggleSaka();
      break;
    default:
      console.error(`Unknown message: '${message}'`);
  }
});

let lastTabId;

async function toggleSaka(tabId) {
  if (SAKA_DEBUG) console.group('toggleSaka');
  // Get the specified tab, or the current tab if none is specified
  const currentTab =
    tabId === undefined
      ? (await browser.tabs.query({
          active: true,
          currentWindow: true
        }))[0]
      : await browser.tabs.get(tabId);
  if (currentTab) {
    // If the current tab is Saka, switch to the previous tab (if it exists) and close the current tab
    if (currentTab.url === browser.runtime.getURL('saka.html')) {
      if (lastTabId) {
        try {
          const lastTab = await browser.tabs.get(lastTabId);
          if (lastTab) {
            try {
              await browser.tabs.update(lastTabId, { active: true });
              if (SAKA_DEBUG) console.log(`Switched to tab ${lastTab.url}`);
            } catch (e) {
              if (SAKA_DEBUG)
                console.log(`Failed to switch to tab ${lastTab.url}`);
            }
          }
          lastTabId = undefined;
        } catch (e) {
          if (SAKA_DEBUG)
            console.log(
              `Cannot return to tab ${lastTabId} because it no longer exists`
            );
        }
      }
      try {
        await browser.tabs.remove(currentTab.id);
        if (SAKA_DEBUG) console.log(`Removed tab ${currentTab.url}`);
      } catch (e) {
        if (SAKA_DEBUG) console.log(`Failed to remove tab ${currentTab.url}`);
      }
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
        try {
          const screenshot = await browser.tabs.captureVisibleTab();
          await browser.storage.local.set({ screenshot });
        } catch (e) {
          if (SAKA_DEBUG) console.log('Failed to capture visible tab');
        }
        lastTabId = currentTab.id;
        await browser.tabs.create({
          url: '/saka.html',
          index: currentTab.index,
          active: false
        });
        if (SAKA_DEBUG)
          console.log(
            `Failed to execute Saka into tab. Instead, created new Saka tab after ${
              currentTab.url
            }`
          );
      }
    }
    // If tab couldn't be found (e.g. because query was made from devtools) create a new tab
  } else {
    await browser.tabs.create({
      url: '/saka.html'
    });
    if (SAKA_DEBUG)
      console.log("Couldn't find tab. Instead, created new Saka tab.");
  }
  const window = await browser.windows.getLastFocused();
  await browser.windows.update(window.id, { focused: true });
  if (SAKA_DEBUG) console.groupEnd();
}

async function closeSaka(tab) {
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

chrome.contextMenus.create({
  title: 'Saka',
  contexts: ['all'],
  onclick: (info, tab) => toggleSaka()
});
