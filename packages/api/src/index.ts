import { errors } from 'celebrate';
import mongoose from 'mongoose';
import express from 'express';
import path from 'path';

import { server } from './setup/server';
import { router } from './api/router';
import './api';

const port = process.env.PORT || 8080;

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/test';

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

server.use('/api', router);
server.use(express.static(path.resolve(__dirname, '..', 'build', 'public')));
server.get('*', (req, res) => {
  res.sendfile(path.resolve(__dirname, '..', 'build', 'public', 'index.html'));
});
server.use(errors());

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('server started');
});
