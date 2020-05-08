import axios, { AxiosResponse } from 'axios';

import { QueriesRestMongo } from '../../models/Queries';

class RestFetchInterface {
  private query: QueriesRestMongo;

  constructor(query: QueriesRestMongo) {
    this.query = query;
  }

  async call() {
    const { method, url } = this.query;
    let response: any = [];
    if (axios[method]) {
      response = await (axios[method] as any)(url);
    }
    return { data: response };
  }
}

export { RestFetchInterface };
