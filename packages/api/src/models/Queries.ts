import mongoose from 'mongoose';

interface QueriesMongo extends mongoose.Document {
  name: string;
  page: string;
}
const Queries = mongoose.model<QueriesMongo>(
  'Queries',
  new mongoose.Schema({
    name: String,
    page: { type: mongoose.Schema.Types.ObjectId, ref: 'Pages' }
  })
);

export { Queries as default, Queries };
