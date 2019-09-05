import DataConfig from '../config/DataConfig';
import ajax from '../util/ajax';
import json from '../util/json';

class Chaos {
  public url: string;
  public data;
  constructor(date: string, format: string, rating: number) {
    this.url = `${DataConfig.baseUrl}${date}/chaos/${format}-${rating}.json`;
  }

  public async fetch() {
    const body = await ajax(this.url, 'json');
    this.data = body;
    return this.data;
  }
}

export default Chaos;
