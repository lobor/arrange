import { celebrate, Joi, Segments } from 'celebrate';

import { Components } from '../../models/Components';
import { server } from '../../setup/server';

server.post(
  '/deleteComponent',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.string().required()
    })
  }),
  async (req, res) => {
    await Components.deleteOne({ _id: req.body.id });
    res.json({});
  }
);
