import mongoose from 'mongoose';
import config from '../config';
import logger, { errorLogger } from '../utils/logger';

mongoose.set('debug', process.env.NODE_ENV === 'development');
mongoose.set('useCreateIndex', true);
mongoose.Promise = Promise;

mongoose
  .connect(config.mongoUri, {
    keepAlive: true,
    useNewUrlParser: true,
  })
  .then(() => logger.info('Connected to mongo database sucessfully.'))
  .catch(e => {
    errorLogger.log(e);
    logger.error(e);
  });

export { default as User } from './user';
export { default as Article } from './article';
export { default as Note } from './note';
