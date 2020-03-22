import { celebrate, Joi, Segments } from 'celebrate';

import { Components } from '../../models/Components';
import { server } from '../../setup/server';

server.put(
  '/components',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      defaultValue: Joi.string()
        .allow('')
        .optional(),
      disableWhen: Joi.string().optional(),
      label: Joi.string(),
      onBlur: Joi.string().optional(),
      placeholder: Joi.string()
        .allow('')
        .optional(),
      required: Joi.boolean(),
      validation: Joi.boolean(),
      whenHide: Joi.string().optional(),
      style: Joi.object().optional(),
      id: Joi.string().required(),
      name: Joi.string().required(),
      position: Joi.object()
        .keys({
          x: Joi.number().required(),
          y: Joi.number().required()
        })
        .required(),
      inputType: Joi.string().required()
    })
  }),
  async (req, res) => {
    res.json(await Components.findOneAndUpdate({ _id: req.body.id }, req.body, { new: true }));
  }
);
