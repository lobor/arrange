import { celebrate, Joi, Segments } from 'celebrate';

import { QueriesRest } from '../../models/Queries';
import { Datasources, DatasourceRest } from '../../models/Datasources';
import { Pages } from '../../models/Pages';
import { router } from '../router';

router.post(
  '/queries',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      page: Joi.string().required()
    })
  }),
  async (req, res) => {
    const datasource = await Datasources.findOne();
    if (!datasource) {
      res
        .status(500)
        .json({
          error: 'datasource not found for this accound, you should create datasource first'
        })
        .end();
      return;
    }
    let Model;
    const modifer: { url?: string } = {};
    switch (datasource.kind) {
      case 'DatasourcesRest':
        Model = QueriesRest;
        modifer.url = ((datasource as unknown) as DatasourceRest).url;
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
    const query = new Model({
      name: req.body.name,
      datasource: datasource._id,
      page: req.body.page,
      ...modifer
    });
    await query.save();
    await Pages.findByIdAndUpdate(req.body.page, { $push: { queries: query._id } });
    res.json(query);
  }
);
