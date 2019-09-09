class Pokedex {
  public data;

  constructor() {
    this.data = require('../../../data/pokedex.js'); // eslint-disable-line
  }

  public getPokemon(species: string): PokedexEntry {
    const formattedSpecies = species
      .toLowerCase()
      .replace(/\s/gi, '')
      .replace(/\./gi, '')
      .replace(/-/gi, '')
      .replace(/_/gi, '')
      .replace(/:/gi, '');

    if (this.data.BattlePokedex[formattedSpecies] !== undefined) {
      return this.data.BattlePokedex[formattedSpecies];
    }
    return null;
  }
}

export default new Pokedex();
