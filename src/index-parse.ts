#!/usr/bin/env node

import * as args from 'args';
import App from './App';

args
  .command('parse', 'Parse Smogon usage stats data')
  .option('date', 'The date to parse Smogon data for.')
  .option('format', 'The format to parse Smogon data for.')
  .option('rating', 'The rating to parse Smogon data for.')
  .option('output', 'Destination directory to output parsed JSON to.')
  .option('local', '(Optional) Parse local files instead of remote.');

const flags = args.parse(process.argv);

if (
  // eslint-disable-next-line
  process.argv['date'] === undefined ||
  // eslint-disable-next-line
  process.argv['format'] === undefined ||
  // eslint-disable-next-line
  process.argv['rating'] === undefined ||
  // eslint-disable-next-line
  process.argv['output'] === undefined
) {
  args.showHelp();
} else {
  const app = new App(flags);
  app.parse();
}
