// TODO: consider adding async msg with results if needed
export default function server (actions, onConnect, onDisconnect) {
  chrome.runtime.onConnect.addListener((port) => {
    if (SAKA_DEBUG) {
      console.log('client connected', port);
    }
    port.onMessage.addListener(async ([t, action, arg]) => {
      if (SAKA_DEBUG) {
        console.log(`rx[${t}][${action}]`, arg);
      }
      const reply = await actions[action](arg, port.sender);
      port.postMessage([ t, reply ]);
      if (SAKA_DEBUG) {
        console.log(`tx[${t}]`, reply);
      }
    });
    const msg = (action, arg) => {
      if (SAKA_DEBUG) {
        console.log(`tx[${0}][${action}]`, arg, port.sender);
      }
      port.postMessage([0, action, arg]);
    };
    const result = onConnect(port, msg);
    port.onDisconnect.addListener((port) => onDisconnect(port, result));
  });
}
