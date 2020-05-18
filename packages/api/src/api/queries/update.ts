import { celebrate, Joi, Segments } from 'celebrate';

import { KIND as KINDDatasources, DatasourceMongo, Datasources, DatasourceRest } from '../../models/Datasources';
import { Queries, QueriesMongo, KIND } from '../../models/Queries';
import { router } from '../router';

const model = Joi.object().keys({
  name: Joi.string().required(),
  datasource: Joi.string().required(),
  onLoad: Joi.boolean().optional()
});

router.put(
  '/queries/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required()
    }),
    [Segments.BODY]: Joi.alternatives().try(
      model,
      model.append({
        method: Joi.string()
          .required()
          .allow('GET', 'POST', 'DELETE', 'PUT'),
        path: Joi.string().required()
      }),
      model.append({
        collections: Joi.string(),
        method: Joi.string(),
        query: Joi.string(),
        update: Joi.string(),
        projection: Joi.string().allow(''),
        runAfter: Joi.string().allow('')
      })
    )
  }),
  async (req, res) => {
    const datasource = await Datasources.findOne({ _id: req.body.datasource });
    if (!datasource) {
      res
        .status(404)
        .json({ error: 'datasource not found' })
        .end();
      return;
    }

    let kind;
    let update = {};
    switch (datasource.kind) {
      case KINDDatasources.DatasourcesRest:
        kind = KIND.KIND_QUERIES_REST;
        update = {
          url: (datasource as DatasourceRest).url + req.body.path
        };
        break;
      case KINDDatasources.DatasourcesMongo:
        update = {
          dbHost: (datasource as DatasourceMongo).dbHost,
          dbPort: (datasource as DatasourceMongo).dbPort,
          dbName: (datasource as DatasourceMongo).dbName,
          dbUsername: (datasource as DatasourceMongo).dbUsername,
          dbPassword: (datasource as DatasourceMongo).dbPassword
        };
        kind = KIND.KIND_QUERIES_MONGO;
        break;
      default:
    }

    if (!kind) {
      res
        .status(500)
        .json({
          error: 'kind not found'
        })
        .end();
      return;
    }
    const updateDocument = await Queries.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          ...req.body,
          ...update,
          kind
        }
      },
      { new: true, strict: false }
    );
    if (!updateDocument) {
      res.status(500).json({ error: "Can't update" });
      return;
    }
    res.json(updateDocument);
  }
);
