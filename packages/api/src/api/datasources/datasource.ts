import mongoose from 'mongoose';

import { Datasources, DatasourceMongo, KIND } from '../../models/Datasources';
import { router } from '../router';

router.get('/datasources/:id', async (req, res) => {
  const { id } = req.params
  const datasource = await Datasources.findOne({ _id: id });
  if (!datasource) {
    res.status(404).json({ error: '404' });
  } else {
    res.json(datasource);
  }
});
