import { celebrate, Joi, Segments } from 'celebrate';

import { Queries } from '../../models/Queries';
import { Datasources } from '../../models/Datasources';
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
    const Model = Queries;
    const modifer: { url?: string } = {};
    // switch (datasource.kind) {
    //   case 'DatasourcesRest':
    //     Model = QueriesRest;
    //     modifer.url = ((datasource as unknown) as any).url;
    //     break;
    //   default:
    // }
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
    await (query as any).save();
    await Pages.findByIdAndUpdate(req.body.page, { $push: { queries: query._id } });
    res.json(query);
  }
);
