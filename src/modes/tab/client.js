import { prettifyURL } from 'lib/url.js';

const mode = {
  id: 'tab',
  icon: 'tab',
  colors: {
    theme: '#11AA77',
    title: '#000000',
    subtitle: '#3f51f5'
  }
};

export default {
  // client-side pre-render result transformation
  transform: (result, query) => {
    const tab = result;
    return {
      // render-props
      mode,
      title: prettifyURL(tab.url, query),
      subtitle: tab.url,
      icon: tab.incognito ? { name: 'block' } : { url: tab.url }
    };
  }
};
