class Abilities {
  public data;

  constructor() {
    this.data = require('../../../data/abilities.js'); // eslint-disable-line
  }

  public getAbility(ability: string) {
    const formattedAbility = ability
      .toLowerCase()
      .replace(/\s/gi, '')
      .replace(/\./gi, '')
      .replace(/-/gi, '')
      .replace(/_/gi, '')
      .replace(/:/gi, '');

    if (this.data.BattleAbilities[formattedAbility] !== undefined) {
      return this.data.BattleAbilities[formattedAbility];
    }
    return null;
  }
}

export default new Abilities();
