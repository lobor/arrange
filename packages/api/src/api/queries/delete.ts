import { celebrate, Joi, Segments } from 'celebrate';

import { Queries } from '../../models/Queries';
import { Pages } from '../../models/Pages';
import { router } from '../router';

router.delete(
  '/queries',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      _id: Joi.string().required()
    })
  }),
  async (req, res) => {
    const query = await Queries.findOneAndDelete({ _id: req.body._id });
    if (!query) {
      res.status(500).end();
      return;
    }
    await Pages.findByIdAndUpdate(query.page, {
      $pull: { queries: query._id }
    });
    res.json(query);
  }
);
