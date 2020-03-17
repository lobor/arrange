import mongoose from 'mongoose';

const Datasources = mongoose.model(
  'Datasources',
  new mongoose.Schema({
    name: String
  })
);

export { Datasources };
