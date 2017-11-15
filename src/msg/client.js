import client from 'msgx/client';

const msg = client({
  zoom: (zoom) => {
    window.dispatchEvent(new CustomEvent('zoom', { detail: { zoom } }));
  }
});
export default msg;
