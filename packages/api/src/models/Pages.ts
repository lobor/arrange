import mongoose from 'mongoose';

const Pages = mongoose.model(
  'Pages',
  new mongoose.Schema({
    name: String,
    components: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Components' }],
    queries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Queries' }]
  })
);

export { Pages as default, Pages };
