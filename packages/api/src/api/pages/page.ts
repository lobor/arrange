import { celebrate, Joi, Segments } from 'celebrate';

import { Pages } from '../../models/Pages';
import { router } from '../router';

router.get(
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
      res.status(404).json({ error: 'notFound' });
      return;
    }
    res.json(page);
  }
);
