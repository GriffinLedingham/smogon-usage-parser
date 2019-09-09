import { promises as fs } from 'fs';

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
      fs.writeFile(
        `${this.output}${this.date}/${this.format}-${this.rating}.json`,
        JSON.stringify(output),
        'utf8',
      ).then(() => {
        resolve();
      });
    });
  }
}

export default App;
