import mongoose from 'mongoose';

import { Datasources, DatasourceMongo, KIND } from '../../models/Datasources';
import { router } from '../router';

router.get('/datasources', async (req, res) => {
  const datasources = await Datasources.find({});
  const result = [];
  for (let i = 0; i < datasources.length; i++) {
    const datasource = datasources[i].toObject();
    if (datasource.kind === KIND.DatasourcesMongo) {
      const { dbHost, dbName, dbUsername, dbPassword } = datasource;
      const config: {
        dbName: string;
        useNewUrlParser: boolean;
        useUnifiedTopology: boolean;
        user?: string;
        pass?: string;
      } = {
        dbName,
        useNewUrlParser: true,
        useUnifiedTopology: true
      };
      if (dbUsername) {
        config.user = dbUsername;
      }
      if (dbPassword) {
        config.pass = dbPassword;
      }
      let collections = [];
      try {
        // eslint-disable-next-line no-await-in-loop
        const con = await mongoose.createConnection(dbHost, config);
        // eslint-disable-next-line no-await-in-loop
        collections = await con.db.listCollections().toArray();
      } catch (e) {
        console.log(e.toString());
      }

      (datasources[i] as DatasourceMongo & {
        collections: string[];
      }).collections = collections.map(({ name }) => name);
      result.push({ ...datasource, collections: collections.map(({ name }) => name) });
    } else {
      result.push(datasource);
    }
  }
  res.json(result);
});
