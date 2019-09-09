import DataConfig from '../config/DataConfig';
import ajax from '../util/ajax';
import json from '../util/json';

class Chaos {
  public url: string;
  public localDir: string;
  public data;
  constructor(date: string, format: string, rating: number, localDir?: string) {
    this.url = `${DataConfig.baseUrl}${date}/chaos/${format}-${rating}.json`;
    if (localDir !== undefined) {
      this.localDir = `${localDir}${format}-${rating}.json`;
    }
  }

  public async fetch() {
    let body;
    if (this.localDir !== undefined) body = await json(this.localDir);
    else body = await ajax(this.url, 'json');

    this.data = body;
    return this.data;
  }
}

export default Chaos;
