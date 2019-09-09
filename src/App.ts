import Chaos from './classes/Chaos';
import Parser from './classes/Parser';

class App {
  public date: string;
  public format: string;
  public rating: number;
  public localDir: string;
  constructor(args: { [key: string]: string }) {
    this.date = args.date;
    this.format = args.format;
    this.rating = parseInt(args.rating);
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
    parser.parse();
  }
}

export default App;
