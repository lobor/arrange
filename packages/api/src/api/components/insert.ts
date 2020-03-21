import { celebrate, Joi, errors, Segments } from 'celebrate';

import { Components } from '../../models/Components';
import { server } from '../../setup/server';
import { Pages } from '../../models/Pages';

server.post(
  '/components',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      label: Joi.string().required(),
      inputType: Joi.string().required(),
      name: Joi.string().required(),
      style: Joi.object().optional(),
      position: Joi.object()
        .keys({
          x: Joi.number().required(),
          y: Joi.number().required()
        })
        .required(),
      page: Joi.string().required(),
      required: Joi.boolean().required(),
      validation: Joi.boolean().required(),
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
