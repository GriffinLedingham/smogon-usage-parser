import * as fetch from 'node-fetch';

export const ajax = async (request: RequestInfo, type: string): Promise<any> =>
  new Promise((resolve: Function) => {
    fetch(request)
      // eslint-disable-next-line
      .then((response) => {
        if (type === 'json') return response.json();
        if (type === 'text') return response.text();
      })
      .then((body: string) => {
        resolve(body);
      });
  });

export default ajax;
