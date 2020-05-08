import mongoose from 'mongoose';

import { options } from './constants';

enum KIND {
  DatasourcesMongo = 'DatasourcesMongo',
  DatasourcesRest = 'DatasourcesRest'
}

export interface DatasourceBaseMongo extends mongoose.Document {
  name: string;
  kind: KIND;
}
export interface DatasourceMongo extends DatasourceBaseMongo {
  projection: string;
  dbHost: string;
  dbPort: number;
  dbName: string;
  dbUsername: string;
  dbPassword: string;
}
export interface DatasourceRest extends DatasourceBaseMongo {
  url: string;
}

const Datasources = mongoose.model<DatasourceRest | DatasourceMongo>(
  'Datasources',
  new mongoose.Schema(
    {
      name: String,
      type: String
    },
    options
  )
);

const DatasourcesMongo = Datasources.discriminator<DatasourceMongo>(
  KIND.DatasourcesMongo,
  new mongoose.Schema(
    {
      projection: String,
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
  KIND.DatasourcesRest,
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

export { KIND, Datasources as default, DatasourcesMongo, DatasourcesRest, Datasources };
