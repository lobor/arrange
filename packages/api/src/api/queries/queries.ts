import { Queries } from '../../models/Queries';
import { router } from '../router';

router.get('/queries', async (req, res) => {
  res.json(await Queries.find());
});
