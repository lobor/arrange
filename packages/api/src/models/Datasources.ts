import mongoose, { Document } from 'mongoose';

interface DatasourceType extends Document {
  name: string;
  dbHost: string;
  dbPort: number;
  dbName: string;
  dbUsername: string;
  dbPassword: string;
  type: string;
}

const Datasources = mongoose.model<DatasourceType>(
  'Datasources',
  new mongoose.Schema({
    name: String,
    dbHost: String,
    dbPort: Number,
    dbName: String,
    dbUsername: String,
    dbPassword: String,
    type: String
  })
);

export { Datasources };
