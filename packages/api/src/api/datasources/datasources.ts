import { Datasources } from '../../models/Datasources';
import { server } from '../../setup/server';

server.get('/datasources', async (req, res) => {
  res.json(await Datasources.find());
});
