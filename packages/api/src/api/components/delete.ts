import { celebrate, Joi, Segments } from 'celebrate';

import { Components } from '../../models/Components';
import { Pages } from '../../models/Pages';
import { server } from '../../setup/server';

server.delete(
  '/components',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.string().required()
    })
  }),
  async (req, res) => {
    const component = await Components.findOneAndDelete({ _id: req.body.id });
    if (!component) {
      res.status(500).end();
      return;
    }
    await Pages.findByIdAndUpdate(component.page, {
      $pull: { components: component._id }
    });
    res.json(component);
  }
);
