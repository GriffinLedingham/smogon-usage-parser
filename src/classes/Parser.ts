import Chaos from './Chaos';
import NameParser from './parsers/NameParser';
import Ranking from './Ranking';
import RankingParser from './parsers/RankingParser';
import TypesParser from './parsers/TypesParser';
import StatsParser from './parsers/StatsParser';
import AbilitiesParser from './parsers/AbilitiesParser';
import ItemsParser from './parsers/ItemsParser';
import SpreadsParser from './parsers/SpreadsParser';
import MovesParer from './parsers/MovesParer';
import TeammatesParser from './parsers/TeammatesParser';
import ViabilityParser from './parsers/ViabilityParser';

const kFormatter = (num: number) => (num > 999 ? (num / 1000).toFixed(0) : num);

class Parser {
  public chaos: {
    info: { [key: string]: any };
    data: { [key: string]: ChaosPokemon };
  };
  public ranking: { [key: string]: RankingPokemon };
  public date: string;
  public format: string;
  public rating: number;
  public localDir: string;
  constructor(date: string, format: string, rating: number, localDir: string) {
    this.date = date;
    this.format = format;
    this.rating = rating;
    this.localDir = localDir;
  }

  public async fetch() {
    const chaos = new Chaos(this.date, this.format, this.rating, this.localDir);
    this.chaos = await chaos.fetch();

    const ranking = new Ranking(
      this.date,
      this.format,
      this.rating,
      this.localDir,
    );
    this.ranking = await ranking.fetch();
  }

  public parse() {
    const result = [];
    const pData = this.chaos.data;
    const rData = this.ranking;
    Object.keys(pData).forEach((pName: string) => {
      const pokemon: ChaosPokemon = pData[pName];
      const pokemonRanking: RankingPokemon = rData[pName];
      pokemon.Name = pName;
      const parsedPokemon = {
        name: NameParser.parseName(pokemon),
        types: TypesParser.parseTypes(pokemon),
        stats: StatsParser.parseStats(pokemon),
        abilities: AbilitiesParser.parseAbilities(pokemon),
        raw_count: kFormatter(pokemon['Raw count']),
        percent: Math.round(parseFloat(pokemonRanking['Usage %'])),
        ranking: RankingParser.parseRanking(pokemonRanking),
        viability: ViabilityParser.parseViability(pokemon),
        items: ItemsParser.parseItems(pokemon),
        spreads: SpreadsParser.parseSpreads(pokemon),
        moves: MovesParer.parseMoves(pokemon),
        team: TeammatesParser.parseTeammates(pokemon, pokemonRanking, rData),
      };
      result.push(parsedPokemon);
    });
    return result.sort((a, b) => b.percent - a.percent);
  }
}

export default Parser;
