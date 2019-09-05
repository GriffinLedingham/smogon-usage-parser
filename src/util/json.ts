export const json = async (path: string): Promise<any> =>
  new Promise((resolve: Function) => resolve(require(path))); // eslint-disable-line

export default json;
