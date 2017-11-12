import client from 'lib/msg/client';

const msg = client(
  {
    zoom: (zoom) => {
      window.dispatchEvent(new CustomEvent('zoom', { detail: { zoom } }));
    }
  }
);
export default msg;
