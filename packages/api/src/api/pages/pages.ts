import { Pages } from '../../models/Pages';

import { router } from '../router';

router.get('/pages', async (req, res) => {
  res.json(await Pages.find());
});
