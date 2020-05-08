import Handlebars from 'handlebars';
import mongoose from 'mongoose';

import { QueriesMongoMongo } from '../../models/Queries';

class MongoFetchInterface {
  private query: QueriesMongoMongo;

  private scope: object;

  constructor(query: QueriesMongoMongo, scope: object) {
    this.query = query;
    this.scope = scope;
  }

  async call() {
    const {
      dbHost,
      dbName,
      dbUsername,
      dbPassword,
      query,
      collections,
      projection
    } = this.query.toObject();
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
    let data = [];
    let error;
    try {
      const con = await mongoose.createConnection(dbHost, config);
      const configQuery: { projection?: object } = {};
      if (projection) {
        configQuery.projection = JSON.parse(projection);
      }
      let value: string = '';
      try {
        const templateValue = Handlebars.compile(query || '');
        value = templateValue(this.scope);
      } catch (e) {
        console.log('ERROR:', e.toString());
      }
      data = await con
        .collection(collections)
        .find(JSON.parse(value), configQuery)
        .toArray();
    } catch (e) {
      error = e.toString();
      console.log(error);
    }
    return { data, error };
  }
}

export { MongoFetchInterface };
