import server from 'lib/msg/server';
import { getSuggestions, activateSuggestion } from 'suggestion_engine/server';

server(
  { // endpoints client queries with msg()
    sg: getSuggestions,
    zoom: (_, sender) => browser.tabs.getZoom(sender.tab.id),
    focusTab: (_, sender) => browser.tabs.update(sender.tab.id, { active: true }),
    activateSuggestion
  },
  function onConnect (port, msg) {
    const onZoomChange = ({ tabId, newZoomFactor }) => {
      if (port.sender.tab.id === tabId) {
        msg('zoom', newZoomFactor);
      }
    };
    browser.tabs.onZoomChange.addListener(onZoomChange);
    return onZoomChange;
  },
  function onDisconnect (port, onZoomChange) {
    browser.tabs.onZoomChange.removeListener(onZoomChange);
  }
);
