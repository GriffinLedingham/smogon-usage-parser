import { promises as fs } from 'fs';
import * as path from 'path';

export const file = async (filename: string): Promise<any> =>
  new Promise((resolve: Function) => {
    // eslint-disable-next-line
    fs.readFile(path.join(__dirname, filename), 'utf-8').then(
      (body: string | Buffer) => {
        const result = body.toString();
        resolve(result);
      },
    ); // eslint-disable-line
  });

export default file;
