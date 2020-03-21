import { celebrate, Joi, Segments } from 'celebrate';
import mongoose from 'mongoose'

import { server } from '../../setup/server';

server.post(
  '/datasources/check',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      dbHost: Joi.string().required(),
      dbPort: Joi.number().required(),
      dbName: Joi.string().required(),
      dbUsername: Joi.string().allow(''),
      dbPassword: Joi.string().allow('')
    })
  }),
  async (req, res) => {
    console.log(req.body)
    const { dbHost, dbName, dbUsername, dbPassword } = req.body;
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
      console.log(config)
    try {
      const con = await mongoose.createConnection(dbHost, config);
      res.status(200).end();
      con.close();
    } catch (e) {
      console.log(e.toString());
      res.status(500).end();
    }
  }
);
