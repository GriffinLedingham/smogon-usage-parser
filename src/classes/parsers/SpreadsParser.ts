// eslint-disable-next-line
export const parseSpreads = (
  pokemon: ChaosPokemon,
  // eslint-disable-next-line
): Array<{ [key: string]: string | number }> => {
  const spreads = pokemon.Spreads;
  const result = [];
  let totalPercent = 0;
  Object.keys(spreads).forEach((spread: string) => {
    const percent = spreads[spread];
    totalPercent += percent;
  });
  Object.keys(spreads).forEach((spread: string) => {
    const percent = spreads[spread];
    const spreadArray = spread.split(':');
    const spreadData = {
      nature: spreadArray[0],
      ev: spreadArray[1],
      percent: '',
    };
    const spreadUsage = (percent / totalPercent) * 100;
    if (spreadUsage >= 0.5) {
      spreadData.percent = spreadUsage.toFixed(3);
      result.push(spreadData);
    }
  });

  // eslint-disable-next-line
  return result.sort((a, b) => {
    return b.percent - a.percent;
  });
};

export default { parseSpreads };
