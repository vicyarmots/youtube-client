let data = {};

const store = {
  clear() {
    data = { items: [], nextPageToken: null , staticsItems: []};
  },
  add({ items, nextPageToken}, staticsItems) {
    data.nextPageToken = nextPageToken;
    data.items = data.items.concat(items);
    data.staticsItems = data.staticsItems.concat(staticsItems);
  },
  removeHead() {
    data.items.shift();
    data.staticsItems.shift();
  },
  getNextPageToken() {
    return data.nextPageToken;
  },
  getLength() {
    return data.items.length;
  },
  getAllItems() {
    return JSON.parse(JSON.stringify(data.items));
  },
  getStatics() {
    return JSON.parse(JSON.stringify(data.staticsItems));
  }
};

export default store;
