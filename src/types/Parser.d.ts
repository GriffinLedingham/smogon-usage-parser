declare interface ParsedPokemon {
  name: string;
  ranking: number;
  types: Array<string>;
  stats: { [key: string]: number };
  abilities: Array<{ ability: string; percent: number }>;
  items: Array<{ item: string; item_us: string; percent: number }>; // eslint-disable-line
  spreads: Array<{ nature: string; percent: number }>;
  moves: Array<{ move: string; type: string; percent: number }>;
  team: Array<{ pokemon: string; types: Array<string>; rank: number }>;
  raw_count: number; // eslint-disable-line
  percent: number;
}
