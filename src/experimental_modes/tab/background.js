function getSuggestions() {}

export default {
  mode: 'tab',
  async search(query) {
    return getSuggestions(query);
  },
  messages: {}
};
