import * as asciiparse from 'asciiparse';

import DataConfig from '../config/DataConfig';
import file from '../util/file';
import ajax from '../util/ajax';

const formatData = (data: Array<{ [key: string]: any }>) => {
  const formattedObj = {};
  data.forEach((item: { [key: string]: any }) => {
    formattedObj[item.Pokemon] = item;
  });
  return formattedObj;
};

class Ranking {
  public url: string;
  public localDir: string;
  public data;
  constructor(date: string, format: string, rating: number, localDir?: string) {
    this.url = `${DataConfig.baseUrl}${date}/${format}-${rating}.txt`;
    if (localDir !== undefined) {
      this.localDir = `${localDir}${format}-${rating}.txt`;
    }
  }

  public async fetch(): Promise<any> {
    let body;
    if (this.localDir !== undefined) {
      body = await file(this.localDir);
    } else body = await ajax(this.url, 'text');

    const lines = body.split('\n');
    lines.splice(0, 2);
    body = lines.join('\n');

    return new Promise((resolve: Function) => {
      asciiparse.parseString(
        body,
        { junction: ' + ', multiline: false },
        (err, data) => {
          this.data = formatData(data);
          resolve(this.data);
        },
      );
    });
  }
}

export default Ranking;
