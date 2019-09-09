import Items from '../data/Items';

// eslint-disable-next-line
export const parseItems = (
  pokemon: ChaosPokemon,
  // eslint-disable-next-line
): Array<{ [key: string]: string | number }> => {
  const items = pokemon.Items;
  const result = [];
  let totalPercent = 0;
  let otherPercent = 0;
  Object.keys(items).forEach((item: string) => {
    const percent = items[item];
    totalPercent += percent;
  });
  Object.keys(items).forEach((item: string) => {
    const percent = items[item];
    const PokedexItem = Items.getItem(item);
    if (PokedexItem !== null) {
      const itemData = {
        item: PokedexItem.name,
        item_us: PokedexItem.name.replace(/\s/g, '_'),
        percent: '',
      };
      const itemUsage = (percent / totalPercent) * 100;
      if (itemUsage >= 2) {
        itemData.percent = itemUsage.toFixed(3);
        result.push(itemData);
      } else otherPercent += itemUsage;
    }
  });

  // eslint-disable-next-line
  const sortedResult = result.sort((a, b) => {
    return b.percent - a.percent;
  });

  if (otherPercent > 0) {
    sortedResult.push({
      item: 'Other',
      item_us: 'Other',
      percent: otherPercent.toFixed(3),
    });
  }

  return sortedResult;
};

export default { parseItems };
