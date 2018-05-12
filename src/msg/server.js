import server from 'msgx/server.js';
import {
  getSuggestions,
  activateSuggestion
} from 'suggestion_engine/server/index.js';

server(
  {
    // endpoints client queries with msg()
    sg: getSuggestions,
    zoom: (_, sender) => browser.tabs.getZoom(sender.tab.id),
    focusTab: (_, sender) =>
      browser.tabs.update(sender.tab.id, { active: true }),
    activateSuggestion
  },
  (sender, msg, data) => {
    const onZoomChange = ({ tabId, newZoomFactor }) => {
      if (sender.tab.id === tabId) {
        msg('zoom', newZoomFactor);
      }
    };
    browser.tabs.onZoomChange.addListener(onZoomChange);
    data.onZoomChange = onZoomChange;
  },
  (sender, data) => {
    browser.tabs.onZoomChange.removeListener(data.onZoomChange);
  }
);
