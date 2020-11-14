import { createClient } from 'redis';

// eslint-disable-next-line import/prefer-default-export
export const client = createClient({ host: 'redis' });
