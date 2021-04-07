import { createClient } from 'redis';
import config from '../../config';

export default createClient({ host: config.redisHost, port: config.redisPort });
