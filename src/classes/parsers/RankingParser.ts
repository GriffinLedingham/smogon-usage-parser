export const parseRanking = (pokemon: RankingPokemon): number =>
  parseInt(pokemon.Rank);

export default { parseRanking };
