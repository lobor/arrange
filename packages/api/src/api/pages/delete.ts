import { celebrate, Joi, Segments } from 'celebrate';

import { Components } from '../../models/Components';
import { Pages } from '../../models/Pages';
import { router } from '../router';

router.delete(
  '/pages',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.string().required()
    })
  }),
  async (req, res) => {
    await Components.deleteMany({ page: req.body.id });
    const pages = await Pages.findOneAndDelete({ _id: req.body.id });
    res.json(pages);
  }
);
