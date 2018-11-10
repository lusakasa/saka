import server from 'msgx/server.js';
import {
  getSuggestions,
  activateSuggestion,
  closeTab
} from 'suggestion_engine/server/index.js';

const actions = {
  // endpoints client queries with msg()
  sg: getSuggestions,
  zoom: (_, sender) => browser.tabs.getZoom(sender.tab.id),
  focusTab: (_, sender) => browser.tabs.update(sender.tab.id, { active: true }),
  activateSuggestion,
  closeTab
};

const onConnect = (sender, msg, data) => {
  const onZoomChange = ({ tabId, newZoomFactor }) => {
    if (sender.tab.id === tabId) {
      msg('zoom', newZoomFactor);
    }
  };
  browser.tabs.onZoomChange.addListener(onZoomChange);
  data.onZoomChange = onZoomChange;
};

const onDisconnect = (sender, data) => {
  browser.tabs.onZoomChange.removeListener(data.onZoomChange);
};

server(actions, onConnect, onDisconnect);
