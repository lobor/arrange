import axios, { AxiosResponse, AxiosStatic } from 'axios';

import { QueriesRestMongo } from '../../models/Queries';

class RestFetchInterface {
  private query: QueriesRestMongo;

  constructor(query: QueriesRestMongo) {
    this.query = query.toObject();
  }

  async call() {
    const { method, url } = this.query;
    let data: any = [];
    if (axios[method.toLowerCase() as 'get']) {
      const response = await (axios[method.toLowerCase() as 'get'] as any)(url);
      data = response.data;
    }
    return { data };
  }
}

export { RestFetchInterface };
