import client from 'msgx/client.js';

const msg = client({
  zoom: zoom => {
    window.dispatchEvent(new CustomEvent('zoom', { detail: { zoom } }));
  }
});

export default msg;
