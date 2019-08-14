/* eslint-disable import/first */
/* eslint no-console: 0 */
import '@babel/polyfill';
import express, { json } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import exphbs from 'express-handlebars';

// import routes
import authRoutes from '../routes/auth';
import articleRoutes from '../routes/articles';
import noteRoutes from '../routes/notes';
import newArticles from '../routes/newArticles';

// get middleware
import errorHandler from '../handlers/error';
import { loginRequired, ensureCorrectUser } from '../middleware/auth';

import '../models';
import config from '../config';

const app = express();
const port = config.port || 5000;

// enable cors
app.use(cors());
app.use(morgan('tiny'));
app.use(helmet());
app.use(json());

// app.use(express.static(path.resolve(__dirname, 'public')));

// set view engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// import routes
app.use('/api/auth', authRoutes);
app.use('/api/articles/scrapped', newArticles);
app.use('/api/articles/', loginRequired, ensureCorrectUser, articleRoutes);
app.use('/api/notes', loginRequired, ensureCorrectUser, noteRoutes);

// make middleware to handle routes without handlers
app.use((_req, _res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(port, () => console.log(`Server ready on http://localhost:${port}`));
