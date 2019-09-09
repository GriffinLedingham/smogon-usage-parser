class Moves {
  public data;

  constructor() {
    this.data = require('../../../data/moves.js'); // eslint-disable-line
  }

  public getMove(move: string) {
    const formattedMove = move
      .toLowerCase()
      .replace(/\s/gi, '')
      .replace(/\./gi, '')
      .replace(/-/gi, '')
      .replace(/_/gi, '')
      .replace(/:/gi, '');

    if (this.data.BattleMovedex[formattedMove] !== undefined) {
      return this.data.BattleMovedex[formattedMove];
    }
    return null;
  }
}

export default new Moves();
