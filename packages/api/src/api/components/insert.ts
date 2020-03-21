import { celebrate, Joi, errors, Segments } from 'celebrate';

import { Components } from '../../models/Components';
import { server } from '../../setup/server';
import { Pages } from '../../models/Pages';

server.post(
  '/components',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      position: Joi.object()
        .keys({
          x: Joi.number().required(),
          y: Joi.number().required()
        })
        .required(),
      pageId: Joi.string().required(),
      type: Joi.string().required()
    })
  }),
  async (req, res) => {
    const count = await Components.countDocuments({ type: req.body.type, pageId: req.body.pageId });
    const component = new Components({
      name: `${req.body.name}${count + 1}`,
      position: req.body.position,
      page: req.body.pageId,
      type: req.body.type
    });
    await component.save();

    // eslint-disable-next-line no-underscore-dangle
    await Pages.findByIdAndUpdate(req.body.pageId, { $push: { components: component._id } });
    res.json(component);
  }
);
