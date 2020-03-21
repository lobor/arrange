import { celebrate, Joi, Segments } from 'celebrate';

import { Components } from '../../models/Components';
import { server } from '../../setup/server';

server.put(
  '/components',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      defaultValue: Joi.string().allow(''),
      disableWhen: Joi.string(),
      label: Joi.string(),
      onBlur: Joi.string(),
      placeholder: Joi.string().allow(''),
      required: Joi.boolean(),
      validation: Joi.boolean(),
      whenHide: Joi.string(),
      id: Joi.string().required(),
      name: Joi.string().required(),
      position: Joi.object()
        .keys({
          x: Joi.number().required(),
          y: Joi.number().required()
        })
        .required(),
      inputType: Joi.string().required(),
      page: Joi.string().required()
    })
  }),
  async (req, res) => {
    res.json(await Components.findOneAndUpdate({ _id: req.body.id }, req.body, { new: true }));
  }
);
