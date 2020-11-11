/* eslint-disable no-console */
import config from './config';
import { app } from './server';
import './models';

const { port = 5000 } = config;

app.listen(port, () => console.log(`Listening on port ${port}`));
