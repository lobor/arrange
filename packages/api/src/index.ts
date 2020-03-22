import { errors } from 'celebrate';
import mongoose from 'mongoose';

import { server } from './setup/server';
import './api';

const port = process.env.PORT || 8080;

mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

server.use(errors());

server.listen(port, () => {
  console.log('server started');
});
