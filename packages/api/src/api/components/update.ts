import { celebrate, Joi, Segments } from 'celebrate';

import { Components } from '../../models/Components';
import { server } from '../../setup/server';

server.post(
  '/updateComponent',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.string().required(),
      name: Joi.string().required(),
      position: Joi.object()
        .keys({
          x: Joi.number().required(),
          y: Joi.number().required()
        })
        .required(),
      type: Joi.string().required(),
      pageId: Joi.string().required()
    })
  }),
  async (req, res) => {
    res.json(await Components.findOneAndUpdate({ _id: req.body.id }, req.body, { new: true }));
  }
);
