import { celebrate, Joi, Segments } from 'celebrate';

import { Components } from '../../models/Components';
import { Pages } from '../../models/Pages';
import { router } from '../router';

router.post(
  '/components',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      label: Joi.string().optional(),
      inputType: Joi.string().optional(),
      name: Joi.string().required(),
      style: Joi.object().optional(),
      defaultValue: Joi.string().optional(),
      position: Joi.object()
        .keys({
          x: Joi.number().required(),
          y: Joi.number().required()
        })
        .required(),
      page: Joi.string().required(),
      required: Joi.boolean().optional(),
      validation: Joi.boolean().optional(),
      type: Joi.string().required()
    })
  }),
  async (req, res) => {
    const count = await Components.countDocuments({ type: req.body.type, page: req.body.page });
    const component = new Components({
      ...req.body,
      name: `${req.body.name}${count + 1}`
    });
    await component.save();

    // eslint-disable-next-line no-underscore-dangle
    await Pages.findByIdAndUpdate(req.body.page, { $push: { components: component._id } });
    res.json(component);
  }
);
