import { Datasources } from '../../models/Datasources';
import { router } from '../router';

router.get('/datasources', async (req, res) => {
  res.json(await Datasources.find());
});
