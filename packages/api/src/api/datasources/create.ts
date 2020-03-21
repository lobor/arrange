import { celebrate, Joi, errors, Segments } from 'celebrate';

import { Datasources } from '../../models/Datasources';
import { server } from '../../setup/server';

server.post(
  '/datasources',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      dbHost: Joi.string().required(),
      dbPort: Joi.number().required(),
      dbName: Joi.string().required(),
      dbUsername: Joi.string().allow(''),
      dbPassword: Joi.string().allow('')
    })
  }),
  async (req, res) => {
    const datasource = new Datasources({ ...req.body, type: 'MONGO_DB' });
    await datasource.save();
    res.json(datasource);
  }
);
