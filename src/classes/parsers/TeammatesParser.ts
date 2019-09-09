import Pokedex from '../data/Pokedex';

const sum = (obj) => {
  let result = 0;
  Object.keys(obj).forEach((el: string) => {
    if (obj[el] !== undefined) {
      result += parseFloat(obj[el]);
    }
  });
  return result;
};

export const parseTeammates = (
  cPokemon: ChaosPokemon,
  rPokemon: RankingPokemon,
  rData,
): Array<{ pokemon: string; percent: number; types: Array<string> }> => {
  const abilities = cPokemon.Abilities;
  const abilitiesSum = sum(abilities);

  const teammates = cPokemon.Teammates;
  const result = [];
  Object.keys(teammates).forEach((teammate: string) => {
    if (teammate === 'empty') return;
    const percent = parseFloat(rData[teammate]['Usage %']) * 0.01;
    const teammatePercent = teammates[teammate];
    const teammateData = {
      pokemon: teammate,
      percent: (
        (100 * (abilitiesSum * percent + teammatePercent)) / // eslint-disable-line
        abilitiesSum
      ).toFixed(3),
      types: [],
    };

    const pokedexData = Pokedex.getPokemon(teammate);
    if (pokedexData !== null) {
      pokedexData.types.forEach((type: string) => {
        teammateData.types.push(type.toLowerCase());
      });
      result.push(teammateData);
    }
  });

  return (
    result
      // eslint-disable-next-line
      .sort((a, b) => {
        return b.percent - a.percent;
      })
      .slice(0, 10)
  );
};

export default { parseTeammates };
