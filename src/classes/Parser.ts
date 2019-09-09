import Chaos from './Chaos';
import NameParser from './parsers/NameParser';
import Ranking from './Ranking';
import RankingParser from './parsers/RankingParser';

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
    const pData = this.chaos.data;
    const rData = this.ranking;
    Object.keys(pData).forEach((pName: string) => {
      const pokemon: ChaosPokemon = pData[pName];
      const pokemonRanking: RankingPokemon = rData[pName];
      pokemon.Name = pName;
      const parsedPokemon = {
        name: NameParser.parseName(pokemon),
        ranking: RankingParser.parseRanking(pokemonRanking), // Figure a way to calc this
      };
      console.log(parsedPokemon);
    });
    return this.chaos;
  }
}

export default Parser;
