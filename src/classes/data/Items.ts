class Items {
  public data;

  constructor() {
    this.data = require('../../../data/items.js'); // eslint-disable-line
  }

  public getItem(item: string) {
    const formattedItem = item
      .toLowerCase()
      .replace(/\s/gi, '')
      .replace(/\./gi, '')
      .replace(/-/gi, '')
      .replace(/_/gi, '')
      .replace(/:/gi, '');

    if (this.data.BattleItems[formattedItem] !== undefined) {
      return this.data.BattleItems[formattedItem];
    }
    return null;
  }
}

export default new Items();
