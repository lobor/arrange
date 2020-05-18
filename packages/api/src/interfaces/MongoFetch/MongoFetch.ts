import Handlebars from 'handlebars';
import mongoose from 'mongoose';

import { QueriesMongoMongo } from '../../models/Queries';

class MongoFetchInterface {
  private query: QueriesMongoMongo;

  private scope: object;

  constructor(query: QueriesMongoMongo, scope: object) {
    this.query = query.toObject();
    this.scope = scope;
  }

  private async connect() {
    const { dbHost, dbName, dbUsername, dbPassword } = this.query;
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
    return mongoose.createConnection(dbHost, config);
  }

  async call() {
    const { method } = this.query;
    let data: object | [] | undefined;
    let error;
    try {
      if (method === 'find') {
        data = await this.find();
      } else if (method === 'updateOne') {
        data = await this.updateOne();
      }
    } catch (e) {
      error = e.toString();
      console.log(error);
    }
    return { ...(data ? { data } : {}), error };
  }

  private async find() {
    const { query, collections, projection } = this.query;
    const con = await this.connect();
    const configQuery: { projection?: object } = {};
    if (projection) {
      configQuery.projection = JSON.parse(projection);
    }
    let value: string = '';
    try {
      const templateValue = Handlebars.compile(query || '');
      value = templateValue(this.scope);
      console.log(value)
    } catch (e) {
      console.log('ERROR:', e.toString());
    }
    return con
      .collection(collections)
      .find(JSON.parse(value), configQuery)
      .toArray();
  }

  private async updateOne() {
    const { collections, query, update } = this.query;
    const con = await this.connect();
    let queryToParse: string = '';
    let updateToParse: string = '';
    try {
      const templateUpdate = Handlebars.compile(update || '');
      const templateQuery = Handlebars.compile(query || '');
      queryToParse = templateQuery(this.scope);
      updateToParse = templateUpdate(this.scope);
    } catch (e) {
      console.log('ERROR:', e.toString());
    }
    console.log(queryToParse, updateToParse)
    return con
      .collection(collections)
      .findOneAndUpdate(JSON.parse(queryToParse), JSON.parse(updateToParse), {
        returnOriginal: false
      });
  }
}

export { MongoFetchInterface };
