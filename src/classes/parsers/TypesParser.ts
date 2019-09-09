import Pokedex from '../data/Pokedex';

export const parseTypes = (pokemon: ChaosPokemon): Array<string> => {
  const types = [];
  const species = pokemon.Name;
  const pokedexEntry: PokedexEntry = Pokedex.getPokemon(species);
  if (pokedexEntry !== null) {
    // eslint-disable-next-line
    pokedexEntry.types.forEach((type) => {
      return types.push(type.toLowerCase());
    });
  }
  return types;
};

export default { parseTypes };
