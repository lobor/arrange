import axios from 'axios';

import { QueriesRest } from '../../models/Queries';
import { router } from '../router';

router.get('/fetch', async (req, res) => {
  const { queryId } = req.params;
  const data = await QueriesRest.findOne({ _id: queryId });
  if (!data) {
    res.status(404).json({ error: 'Query not found' });
    return;
  }
  const response = await axios.get(`${data.url}${data.path}`);
  console.log(response);
});
