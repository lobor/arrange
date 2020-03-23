import mongoose from 'mongoose';

const Queries = mongoose.model(
  'Queries',
  new mongoose.Schema({
    name: String
  })
);

export { Queries as default, Queries };
