import { celebrate, Joi, Segments } from 'celebrate';

import { Pages } from '../../models/Pages';
import { server } from '../../setup/server';

server.post(
  '/pages',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required()
    })
  }),
  async (req, res) => {
    const page = new Pages({ name: req.body.name });
    await page.save();
    res.json(page);
  }
);
