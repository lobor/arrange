import { Queries } from '../../models/Queries';
import { server } from '../../setup/server';

server.get('/queries', async (req, res) => {
  res.json(await Queries.find());
});
