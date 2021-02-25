import { promises as fs, writeFileSync } from 'fs';
import { parse } from 'json2csv';

import Chaos from './classes/Chaos';
import Parser from './classes/Parser';

class App {
  public date: string;
  public format: string;
  public rating: number;
  public output: string;
  public localDir: string;
  constructor(args: { [key: string]: string }) {
    this.date = args.date;
    this.format = args.format;
    this.rating = parseInt(args.rating);
    this.output = args.output;
    if (args.local !== undefined) this.localDir = args.local;
  }

  public async parse() {
    const parser = new Parser(
      this.date,
      this.format,
      this.rating,
      this.localDir,
    );
    await parser.fetch();
    const output = parser.parse();
    return new Promise(async (resolve: Function) => {
      try {
        await fs.access(`${this.output}${this.date}/`);
      } catch (e) {
        await fs.mkdir(`${this.output}${this.date}/`);
      }
      try {
        await fs.access(
          `${this.output}${this.date}/${this.format}-${this.rating}`,
        );
      } catch (e) {
        await fs.mkdir(
          `${this.output}${this.date}/${this.format}-${this.rating}`,
        );
      }
      const jsonOutput = JSON.stringify(output);
      const csvRanking = [];
      const csvMoves = [];
      const csvItems = [];
      const csvAbilities = [];
      const csvTeam = [];
      const csvSpreads = [];
      for (let i in output) {
        const pokemon = output[i];
        csvRanking.push({
          pokemon: pokemon.name,
          ranking: pokemon.ranking,
          percent: pokemon.percent,
          hp: pokemon.stats.hp,
          atk: pokemon.stats.atk,
          def: pokemon.stats.def,
          spa: pokemon.stats.spa,
          spd: pokemon.stats.spd,
          spe: pokemon.stats.spe,
        });
        for (let j in pokemon.moves) {
          csvMoves.push({
            pokemon: pokemon.name,
            move: pokemon.moves[j].move,
            percent: pokemon.moves[j].percent,
          });
        }
        for (let j in pokemon.items) {
          csvItems.push({
            pokemon: pokemon.name,
            item: pokemon.items[j].item,
            percent: pokemon.items[j].percent,
          });
        }
        for (let j in pokemon.abilities) {
          csvAbilities.push({
            pokemon: pokemon.name,
            ability: pokemon.abilities[j].ability,
            percent: pokemon.abilities[j].percent,
          });
        }
        for (let j in pokemon.team) {
          csvTeam.push({
            pokemon: pokemon.name,
            teammate: pokemon.team[j].pokemon,
            percent: pokemon.team[j].percent,
          });
        }
        for (let j in pokemon.spreads) {
          const evArr = pokemon.spreads[j].ev.split('/');
          csvSpreads.push({
            pokemon: pokemon.name,
            nature: pokemon.spreads[j].nature,
            ev: pokemon.spreads[j].ev,
            hp: evArr[0],
            atk: evArr[1],
            def: evArr[2],
            spa: evArr[3],
            spd: evArr[4],
            spe: evArr[5],
            percent: pokemon.spreads[j].percent,
          });
        }
      }
      writeFileSync(
        `${this.output}${this.date}/${this.format}-${this.rating}/usage.csv`,
        parse(csvRanking),
        'utf8',
      );
      writeFileSync(
        `${this.output}${this.date}/${this.format}-${this.rating}/moves.csv`,
        parse(csvMoves),
        'utf8',
      );
      writeFileSync(
        `${this.output}${this.date}/${this.format}-${this.rating}/items.csv`,
        parse(csvItems),
        'utf8',
      );
      writeFileSync(
        `${this.output}${this.date}/${this.format}-${this.rating}/abilities.csv`,
        parse(csvAbilities),
        'utf8',
      );
      writeFileSync(
        `${this.output}${this.date}/${this.format}-${this.rating}/team.csv`,
        parse(csvTeam),
        'utf8',
      );
      writeFileSync(
        `${this.output}${this.date}/${this.format}-${this.rating}/spreads.csv`,
        parse(csvSpreads),
        'utf8',
      );
      fs.writeFile(
        `${this.output}${this.date}/${this.format}-${this.rating}/usage.json`,
        jsonOutput,
        'utf8',
      ).then(() => {
        resolve();
      });
    });
  }
}

export default App;
