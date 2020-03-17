import { Pages } from '../../models/Pages';
import { server } from '../../setup/server';

server.get('/pages', async (req, res) => {
  res.json(await Pages.find());
});
