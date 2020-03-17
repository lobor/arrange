import { celebrate, Joi, Segments } from 'celebrate';

import { Components } from '../../models/Components';
import { server } from '../../setup/server';

server.get(
  '/getComponentPage',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      id: Joi.string().required()
    })
  }),
  async (req, res) => {
    res.json(await Components.find({ pageId: req.query.id }));
  }
);
