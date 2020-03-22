import { celebrate, Joi, Segments } from 'celebrate';

import { Pages } from '../../models/Pages';
import { server } from '../../setup/server';

server.get(
  '/pages/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required()
    })
  }),
  async (req, res) => {
    const page = await Pages.findOne({ _id: req.params.id })
      .populate('components')
      .exec();
    if (!page) {
      res.json({ error: 'notFound' });
      return;
    }
    res.json(page);
  }
);
