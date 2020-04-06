import { celebrate, Joi, Segments } from 'celebrate';

import { Datasources } from '../../models/Datasources';
import { Queries, QueriesRest } from '../../models/Queries';
import { router } from '../router';

const model = Joi.object().keys({
  name: Joi.string().required(),
  datasource: Joi.string().required()
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

    let Model;
    switch (datasource.kind) {
      case 'DatasourcesRest':
        Model = QueriesRest;
        break;
      default:
    }

    if (!Model) {
      res
        .status(500)
        .json({
          error: 'datasource have not kind'
        })
        .end();
      return;
    }

    const update = await Model.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    if (!update) {
      res.status(500).end();
      return;
    }
    res.json(update);
  }
);
