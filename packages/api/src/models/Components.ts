import mongoose, { Document } from 'mongoose';

export interface ComponentMongo extends Document {
  name: string;
  page: string;
  position: {
    x: number;
    y: number;
  };
  type: string;
}

const Components = mongoose.model<ComponentMongo>(
  'Components',
  new mongoose.Schema({
    name: String,
    position: {
      x: Number,
      y: Number
    },
    page: { type: mongoose.Schema.Types.ObjectId, ref: 'Pages' },
    type: String
  })
);

export { Components };
