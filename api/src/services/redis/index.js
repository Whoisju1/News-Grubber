import { createClient } from 'redis';
import config from '../../config';

// eslint-disable-next-line import/prefer-default-export
export const client = createClient({ host: config.redisHost });
