import mongoose from 'mongoose';

interface QueriesMongo extends mongoose.Document {
  name: string;
  page: string;
}

const options = { discriminatorKey: 'kind' };

const Queries = mongoose.model<QueriesMongo>(
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

const QueriesRest = Queries.discriminator(
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
