import mongoose from 'mongoose';

export interface ComponentMongo extends mongoose.Document {
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
    onChange: String,
    onBlur: String,
    onSubmit: String,
    placeholder: String,
    format: { type: String, defaultValue: 'body' },
    underline: { type: Boolean, defaultValue: false },
    strong: { type: Boolean, defaultValue: false },
    required: Boolean,
    validation: Boolean,
    whenHide: String,
    name: String,
    data: String,
    style: {},
    position: {
      x: Number,
      y: Number,
      h: Number,
      w: Number
    },
    items: [
      {
        defaultValue: String,
        label: String,
        name: String,
        type: {
          type: String
        }
      }
    ],
    page: { type: mongoose.Schema.Types.ObjectId, ref: 'Pages' },
    type: String
  })
);

// const ComponentsTable = Components.discriminator(
//   'ComponentsTable',
//   new mongoose.Schema(
//     {
//       onRowSelected: String
//     },
//     options
//   )
// );

export { Components };
