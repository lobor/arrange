import { celebrate, Joi, Segments } from 'celebrate';

import { Components } from '../../models/Components';
import { router } from '../router';

router.get(
  '/components/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required()
    })
  }),
  async (req, res) => {
    res.json(await Components.find({ pageId: req.params.id }));
  }
);
