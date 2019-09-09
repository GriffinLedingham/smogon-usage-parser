declare interface BaseStats {
  hp: number;
  atk: number;
  def: number;
  spa: number;
  spd: number;
  spe: number;
}

declare interface PokedexEntry {
  num: number;
  species: string;
  types: Array<string>;
  gender: string;
  baseStats: BaseStats;
  abilities: { [key: string]: string };
  heightm: number;
  weightkg: number;
  color: string;
  eggGroups: Array<string>;
}
