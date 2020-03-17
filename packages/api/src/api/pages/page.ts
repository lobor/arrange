import { celebrate, Joi, Segments } from 'celebrate';

import { Pages } from '../../models/Pages';
import { server } from '../../setup/server';

server.get(
  '/getPage',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      id: Joi.string().required()
    })
  }),
  async (req, res) => {
    res.json(await Pages.findOne({ _id: req.query.id }));
  }
);
