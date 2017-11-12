export default function client (actions, onDisconnect) {
  const port = chrome.runtime.connect();
  let t = 0;
  const transactions = {};
  port.onMessage.addListener(([t, actionOrResult, arg]) => {
    if (t > 0) {
      if (SAKA_DEBUG) {
        console.log(`rx[${t}]`, actionOrResult);
      }
      transactions[t](actionOrResult);
    } else {
      if (SAKA_DEBUG) {
        console.log(`rx[${t}][${actionOrResult}]`, arg);
      }
      actions[actionOrResult](arg);
    }
  });
  port.onDisconnect.addListener(onDisconnect);
  async function msg (action, arg) {
    return new Promise((resolve) => {
      t++;
      if (SAKA_DEBUG) {
        console.log(`tx[${t}][${action}]`, arg);
      }
      port.postMessage([t, action, arg]);
      transactions[t] = resolve;
    });
  };
  return msg;
}
