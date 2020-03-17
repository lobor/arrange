import mongoose from 'mongoose';

const Components = mongoose.model(
  'Components',
  new mongoose.Schema({
    name: String,
    position: {
      x: Number,
      y: Number
    },
    pageId: String,
    type: String
  })
);

export { Components };
