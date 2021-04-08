import { createClient } from 'redis';
import config from '../../config';
import logger, { errorLogger } from '../../utils/logger';

const client = createClient({ host: config.redisHost, port: config.redisPort });

client.on('error', e => {
  logger.error(e);
  errorLogger.log(e);
});

client.on('ready', () => logger.info('Connected to redis successfully.'));

export default client;
