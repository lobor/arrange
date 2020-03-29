import { celebrate, Joi, Segments } from 'celebrate';

import { Queries } from '../../models/Queries';
import { router } from '../router';

router.put(
  '/queries/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required()
    }),
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required()
    })
  }),
  async (req, res) => {
    res.json(await Queries.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }));
  }
);
