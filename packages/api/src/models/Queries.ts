import mongoose from 'mongoose';

export interface QueriesMongo extends mongoose.Document {
  name: string;
  page: string;
}

export interface QueriesRestMongo extends QueriesMongo {
  method: string;
  path: string;
  url: string;
}

const options = { discriminatorKey: 'kind' };

const Queries = mongoose.model<QueriesMongo | QueriesRestMongo>(
  'Queries',
  new mongoose.Schema(
    {
      name: String,
      datasource: { type: mongoose.Schema.Types.ObjectId, ref: 'Datasources' },
      page: { type: mongoose.Schema.Types.ObjectId, ref: 'Pages', required: true }
    },
    options
  )
);

const QueriesRest = Queries.discriminator<QueriesRestMongo>(
  'QueriesRest',
  new mongoose.Schema(
    {
      method: String,
      path: String,
      url: String
    },
    options
  )
);

export { Queries as default, QueriesRest, Queries };
