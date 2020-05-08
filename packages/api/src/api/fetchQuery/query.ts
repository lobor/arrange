import { Queries } from '../../models/Queries';
import { FetchService } from '../../services/Fetch';
import { router } from '../router';

router.get('/fetch', async (req, res) => {
  const { queryId, scope } = req.query;
  const data = await Queries.findOne({ _id: queryId });
  if (!data) {
    res.status(404).json({ error: 'Query not found' });
    return;
  }

  const fetchInstance = new FetchService(data, scope);

  const response = await fetchInstance.call();
  if (response) {
    res.json(response);
  } else {
    res.status(500).json({ error: 'request failed' });
  }
});
