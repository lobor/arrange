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
    defaultValue: String,
    disableWhen: String,
    label: String,
    inputType: String,
    onBlur: String,
    placeholder: String,
    required: Boolean,
    validation: Boolean,
    whenHide: String,
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
