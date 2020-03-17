import { errors } from 'celebrate';
import mongoose from 'mongoose';

import { server } from './setup/server';
import './api';

mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

server.use(errors());

server.listen(8080, () => {
  console.log('server started');
});
