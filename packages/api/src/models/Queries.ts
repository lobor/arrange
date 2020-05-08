import mongoose from 'mongoose';

import type { DatasourceMongo } from './Datasources';
import { options } from './constants';

enum KIND {
  KIND_QUERIES_REST = 'QueriesRest',
  KIND_QUERIES_MONGO = 'QueriesMongo'
}

interface QueriesBaseMongo extends mongoose.Document {
  name: string;
  page: string;
}
export interface QueriesMongoMongo
  extends QueriesBaseMongo,
    Pick<DatasourceMongo, 'dbName' | 'dbHost' | 'dbPort' | 'dbUsername' | 'dbPassword'> {
  kind: KIND.KIND_QUERIES_MONGO;
  collections: string;
  method: string;
  query: string;
}

export interface QueriesRestMongo extends QueriesBaseMongo {
  kind: KIND.KIND_QUERIES_REST;
  method: 'get' | 'post' | 'put';
  path: string;
  url: string;
}

const Queries = mongoose.model<QueriesMongoMongo | QueriesRestMongo>(
  'Queries',
  new mongoose.Schema({
    name: { type: String, required: true },
    datasource: { type: mongoose.Schema.Types.ObjectId, ref: 'Datasources', required: true },
    page: { type: mongoose.Schema.Types.ObjectId, ref: 'Pages', required: true }
  })
);

const QueriesRest = Queries.discriminator<QueriesRestMongo>(
  KIND.KIND_QUERIES_REST,
  new mongoose.Schema(
    {
      method: String,
      path: String,
      url: String
    },
    options
  )
);

const QueriesMongo = Queries.discriminator<QueriesMongoMongo>(
  KIND.KIND_QUERIES_MONGO,
  new mongoose.Schema(
    {
      collections: String,
      method: String,
      query: String,
      dbHost: String,
      dbName: String,
      dbPassword: String,
      dbPort: Number,
      dbUsername: String
    },
    options
  )
);

export { KIND, Queries as default, QueriesMongo, QueriesRest, Queries };
