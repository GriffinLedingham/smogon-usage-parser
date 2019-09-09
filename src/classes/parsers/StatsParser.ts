import Pokedex from '../data/Pokedex';

export const parseStats = (pokemon: ChaosPokemon): BaseStats => {
  const species = pokemon.Name;
  const pokedexEntry: PokedexEntry = Pokedex.getPokemon(species);
  if (pokedexEntry !== null) {
    return pokedexEntry.baseStats;
  }
  return null;
};

export default { parseStats };
