import { celebrate, Joi, Segments } from 'celebrate';

import { Queries } from '../../models/Queries';
import { server } from '../../setup/server';

server.post(
  '/queries',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required()
    })
  }),
  async (req, res) => {
    const query = new Queries({ name: req.body.name });
    await query.save();
    res.json(query);
  }
);
