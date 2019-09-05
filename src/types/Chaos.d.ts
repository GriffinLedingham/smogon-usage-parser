declare interface ChaosPokemon {
  Name?: string;
  Moves: { [key: string]: number };
  Abilities: { [key: string]: number };
  Teammates: { [key: string]: number };
  usage: number;
  Items: { [key: string]: number };
  'Raw count': number;
  Spreads: { [key: string]: number };
  Happiness: { [key: string]: number };
  'Viability Ceiling': Array<number>;
}
