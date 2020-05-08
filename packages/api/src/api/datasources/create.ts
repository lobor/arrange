import { celebrate, Joi, Segments } from 'celebrate';

import { DatasourcesMongo, DatasourcesRest } from '../../models/Datasources';
import { router } from '../router';

const model = Joi.object().keys({
  name: Joi.string().required(),
  type: Joi.string().required()
});

router.post(
  '/datasources',
  celebrate({
    [Segments.BODY]: Joi.alternatives().try(
      model.append({
        dbHost: Joi.string().required(),
        dbName: Joi.string().required(),
        dbPassword: Joi.string()
          .optional()
          .allow(''),
        dbPort: Joi.number().required(),
        dbUsername: Joi.string()
          .allow('')
          .optional()
      }),
      model.append({
        headers: Joi.array().items(Joi.object().keys({ name: Joi.string(), value: Joi.string() })),
        url: Joi.string().required()
      })
    )
  }),
  async (req, res) => {
    const { type } = req.body;
    let toSave;
    switch (type) {
      case 'mongo':
        toSave = new DatasourcesMongo(req.body);
        break;
      case 'rest':
        toSave = new DatasourcesRest(req.body);
        break;
      default:
    }

    if (!toSave) {
      res.status(500);
    } else {
      await (toSave as any).save();
      res.json(toSave);
    }
  }
);
