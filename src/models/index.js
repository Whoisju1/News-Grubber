import mongoose from 'mongoose';
import config from '../config';

mongoose.set('debug', true);
mongoose.Promise = Promise;

mongoose.connect(config.mongoUri, {
  keepAlive: true,
  useNewUrlParser: true,
});

export { default as User } from './user';
export { default as Article } from './article';
export { default as Note } from './note';
