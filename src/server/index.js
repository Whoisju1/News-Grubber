/* eslint-disable import/prefer-default-export */
import '@babel/polyfill';
import express, { json } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

// import routes
import authRoutes from '../routes/auth';
import articleRoutes from '../routes/articles';
import noteRoutes from '../routes/notes';
import newArticles from '../routes/newArticles';

// get middleware
import errorHandler from '../handlers/error';
import { loginRequired } from '../middleware/auth';

const app = express();

// enable cors
app.use(cors());
app.use(morgan('tiny'));
app.use(helmet());
app.use(json());

// app.use(express.static(path.resolve(__dirname, 'public')));

// import routes
app.use('/api/auth', authRoutes);
app.use('/api/articles/scrapped', newArticles);
app.use('/api/articles/', loginRequired, articleRoutes);
app.use('/api/notes', loginRequired, noteRoutes);

// make middleware to handle routes without handlers
app.use((_req, _res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(errorHandler);

export { app };
