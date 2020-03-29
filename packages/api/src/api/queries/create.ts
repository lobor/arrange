import { celebrate, Joi, Segments } from 'celebrate';

import { Queries } from '../../models/Queries';
import { Pages } from '../../models/Pages';
import { router } from '../router';

router.post(
  '/queries',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required()
    })
  }),
  async (req, res) => {
    const query = new Queries({ name: req.body.name });
    await query.save();
    await Pages.findByIdAndUpdate(req.body.page, { $push: { queries: query._id } });
    res.json(query);
  }
);
