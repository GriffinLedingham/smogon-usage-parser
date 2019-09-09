import Moves from '../data/Moves';

// eslint-disable-next-line
export const parseMoves = (
  pokemon: ChaosPokemon,
  // eslint-disable-next-line
): Array<{ [key: string]: string | number }> => {
  const moves = pokemon.Moves;
  const result = [];
  let totalPercent = 0;
  let otherPercent = 0;
  Object.keys(moves).forEach((move: string) => {
    const percent = moves[move];
    totalPercent += percent;
  });
  Object.keys(moves).forEach((move: string) => {
    const percent = moves[move];
    if (move === '') {
      otherPercent += 4 * (percent / totalPercent) * 100;
      return;
    }
    const PokedexMove = Moves.getMove(move);
    if (PokedexMove !== null) {
      const moveData = {
        move: PokedexMove.name,
        type: PokedexMove.type.toLowerCase(),
        percent: '',
      };
      const moveUsage = 4 * (percent / totalPercent) * 100;
      if (moveUsage >= 5) {
        moveData.percent = moveUsage.toFixed(3);
        result.push(moveData);
      } else otherPercent += moveUsage;
    }
  });

  // eslint-disable-next-line
  const sortedResult = result.sort((a, b) => {
    return b.percent - a.percent;
  });

  if (otherPercent > 0) {
    sortedResult.push({
      move: 'Other',
      percent: otherPercent.toFixed(3),
    });
  }

  return sortedResult;
};

export default { parseMoves };
