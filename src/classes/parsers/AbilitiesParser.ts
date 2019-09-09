import Abilities from '../data/Abilities';

// eslint-disable-next-line
export const parseAbilities = (
  pokemon: ChaosPokemon,
  // eslint-disable-next-line
): Array<{ [key: string]: string | number }> => {
  const abilites = pokemon.Abilities;
  const result = [];
  let totalPercent = 0;
  Object.keys(abilites).forEach((ability: string) => {
    const percent = abilites[ability];
    totalPercent += percent;
  });
  Object.keys(abilites).forEach((ability: string) => {
    const percent = abilites[ability];
    const PokedexAbility = Abilities.getAbility(ability);
    const abilityData = {
      ability: PokedexAbility.name,
      percent: ((percent / totalPercent) * 100).toFixed(3),
    };
    result.push(abilityData);
  });

  // eslint-disable-next-line
  return result.sort((a, b) => {
    return b.percent - a.percent;
  });
};

export default { parseAbilities };
