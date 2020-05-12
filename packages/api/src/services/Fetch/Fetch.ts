import { KIND } from '../../models/Queries';
import type { QueriesMongoMongo, QueriesRestMongo } from '../../models/Queries';
import { MongoFetchInterface } from '../../interfaces/MongoFetch';
import { RestFetchInterface } from '../../interfaces/RestFetch';

class FetchService {
  private interface: MongoFetchInterface | RestFetchInterface;

  constructor(query: QueriesMongoMongo | QueriesRestMongo, scope: string) {
    switch (query.get('kind')) {
      case KIND.KIND_QUERIES_MONGO:
        this.interface = new MongoFetchInterface(query as QueriesMongoMongo, JSON.parse(scope));
        break;
      case KIND.KIND_QUERIES_REST:
        this.interface = new RestFetchInterface(query as QueriesRestMongo);
        break;
      default:
        throw new Error('Kind not found');
    }
  }

  async call() {
    const { data } = await this.interface.call();
    return data;
  }
}

export { FetchService };
