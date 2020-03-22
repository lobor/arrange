import express from 'express';
import cors from 'cors';
import BodyParser from 'body-parser';
import morgan from 'morgan';

const server = express();
server.use(cors());
server.use(BodyParser.json());
server.use(morgan('tiny'));

export { server as default, server };
