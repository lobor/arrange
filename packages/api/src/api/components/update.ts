import { celebrate, Joi, Segments } from 'celebrate';

import { Components } from '../../models/Components';
import { router } from '../router';

router.put(
  '/components',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      defaultValue: Joi.string()
        .allow('')
        .optional(),
      disableWhen: Joi.string().optional(),
      label: Joi.string(),
      onChange: Joi.string().optional(),
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
      data: Joi.string().optional(),
      position: Joi.object()
        .keys({
          x: Joi.number().required(),
          y: Joi.number().required(),
          h: Joi.number().required(),
          w: Joi.number().required()
        })
        .required(),
      items: Joi.array().items(
        Joi.object().keys({
          _id: Joi.string(),
          name: Joi.string().required(),
          type: Joi.string().required(),
          defaultValue: Joi.string()
            .allow('')
            .optional(),
          label: Joi.string()
            .allow('')
            .optional()
        })
      ),
      inputType: Joi.string().optional()
    })
  }),
  async (req, res) => {
    res.json(await Components.findOneAndUpdate({ _id: req.body.id }, req.body, { new: true }));
  }
);
