export default class HistoryStore {
  constructor(key, storage) {
    this.key = key;
    this.storage = storage;
    this.items = this.fetchAll();
  }

  get length() {
    return this.items.length;
  }

  fetchRecent() {
    return this.items[this.items.length - 1];
  }

  fetchAll() {
    const raw = this.storage.get(this.key);
    if (raw) {
      return JSON.parse(raw)[this.key];
    }
    return [];
  }

  push(item) {
    this.items.push(item);
    this.save();
  }

  shift() {
    this.items.shift();
    this.save();
  }

  save() {
    const items = this.items;
    let value = JSON.stringify({ [this.key]: items });
    while (items.length > 10 && !this.storage.set(this.key, value)) {
      items.shift();
      value = JSON.stringify({ [this.key]: items });
    }
  }
}
