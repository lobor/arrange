import mongoose from 'mongoose';

const Pages = mongoose.model(
  'Pages',
  new mongoose.Schema({
    name: String
  })
);

export { Pages };
