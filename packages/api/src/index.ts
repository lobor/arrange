import { errors } from 'celebrate';
import mongoose from 'mongoose';
import express from 'express';
import path from 'path'

import { server } from './setup/server';
import './api';

const port = process.env.PORT || 8080;

mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

server.use(express.static(path.resolve(__dirname, '..', 'build', 'public')));
server.get('*', (req, res) => {
  res.sendfile(path.resolve(__dirname, '..', 'build', 'public', 'index.html'));
});
server.use(errors());


server.listen(port, () => {
  console.log('server started');
});
