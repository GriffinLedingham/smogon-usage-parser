export const parseViability = (pokemon: ChaosPokemon) => {
  const viabilityScore = pokemon['Viability Ceiling'][1];
  let result = 'F';
  switch (true) {
    case viabilityScore === 100:
      result = 'A+';
      break;
    case viabilityScore > 92:
      result = 'A';
      break;
    case viabilityScore > 89:
      result = 'A-';
      break;
    case viabilityScore > 86:
      result = 'B+';
      break;
    case viabilityScore > 82:
      result = 'B';
      break;
    case viabilityScore > 79:
      result = 'B-';
      break;
    case viabilityScore > 76:
      result = 'C+';
      break;
    case viabilityScore > 72:
      result = 'C';
      break;
    case viabilityScore > 69:
      result = 'C-';
      break;
    case viabilityScore > 66:
      result = 'D+';
      break;
    case viabilityScore > 62:
      result = 'D';
      break;
    case viabilityScore > 59:
      result = 'D-';
      break;
    default:
      result = 'F';
      break;
  }
  return result;
};

export default { parseViability };
