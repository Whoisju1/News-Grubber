/* eslint-disable import/first */

/* eslint no-console: 0 */

import '@babel/polyfill';
import express, { json } from 'express';
import { appendFile } from 'fs';
import exphbs from 'express-handlebars';
import cors from 'cors';

// import routes
import errorHandler from '../handlers/error';
import authRoutes from '../routes/auth';
import articleRoutes from '../routes/articles';
import noteRoutes from '../routes/notes';
import home from '../routes/home';
import '../models';
import { loginRequired, ensureCorrectUser } from '../middleware/auth';
import config from '../config';

const app = express();
const port = config.port || 3000;

// enable cors
app.use(cors());
app.use(express.static(`${__dirname}/../../public`));

// set view engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use((req, _res, next) => {
  const now = Date().toString();
  const log = `${now} | ${req.method} : ${req.url}`;
  console.log(log);
  appendFile('server.log', `${log}\n`, err => {
    if (err) console.error('Logging Error: ', err);
  });
  next();
});

// parse application/json
app.use(json());

// import routes
app.use('/api/auth', authRoutes);
app.use(
  '/api/users/:id/articles',
  loginRequired,
  ensureCorrectUser,
  articleRoutes
);
app.use('/api/users/:id/notes', loginRequired, ensureCorrectUser, noteRoutes);
app.use(home);

// make middleware to handle routes without handlers
app.use((_req, _res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(port, () => console.log(`Server ready on http://localhost:${port}`));
