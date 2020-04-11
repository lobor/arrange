import mongoose from 'mongoose';

import { options } from './constants';

export interface DatasourceType extends mongoose.Document {
  name: string;
  dbHost: string;
  dbPort: number;
  dbName: string;
  dbUsername: string;
  dbPassword: string;
  type: string;
  kind: string;
}
export interface DatasourceRest extends mongoose.Document {
  name: string;
  url: string;
  kind: string;
}

const Datasources = mongoose.model<DatasourceType>(
  'Datasources',
  new mongoose.Schema(
    {
      name: String,
      type: String
    },
    options
  )
);

const DatasourcesMongo = Datasources.discriminator(
  'DatasourcesMongo',
  new mongoose.Schema(
    {
      dbHost: String,
      dbPort: Number,
      dbName: String,
      dbUsername: String,
      dbPassword: String
    },
    options
  )
);

const DatasourcesRest = Datasources.discriminator<DatasourceRest>(
  'DatasourcesRest',
  new mongoose.Schema(
    {
      url: String,
      headers: [
        {
          name: String,
          value: String
        }
      ]
    },
    options
  )
);

export { Datasources as default, DatasourcesMongo, DatasourcesRest, Datasources };
