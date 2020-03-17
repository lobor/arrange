import { celebrate, Joi, errors, Segments } from 'celebrate';

import { Components } from '../../models/Components';
import { server } from '../../setup/server';

server.post(
  '/insertComponent',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      position: Joi.object()
        .keys({
          x: Joi.number().required(),
          y: Joi.number().required()
        })
        .required(),
      pageId: Joi.string().required(),
      type: Joi.string().required()
    })
  }),
  async (req, res) => {
    const count = await Components.countDocuments({ type: req.body.type, pageId: req.body.pageId });
    const component = new Components({
      name: `${req.body.name}${count + 1}`,
      position: req.body.position,
      pageId: req.body.pageId,
      type: req.body.type
    });
    await component.save();
    res.json(component);
  }
);
