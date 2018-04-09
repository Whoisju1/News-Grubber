/* eslint no-console: 0 */
/* eslint consistent-return: 0 */

const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

// load environment variables
require('dotenv').config();

// import routes
const errorHandler = require('../handlers/error');
const authRoutes = require('../routes/auth');
const articleRoutes = require('../routes/articles');
const noteRoutes = require('../routes/notes');
require('../models');
const { loginRequired, ensureCorrectUser } = require('../middleware/auth');


const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  const now = Date().toString();
  const log = `${now} | ${req.method} : ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', `${log}\n`, (err) => {
    if (err) console.error('Logging Error: ', err);
  });
  next();
});

// parse application/json
app.use(bodyParser.json());

// import routes
app.use('/api/auth', authRoutes);
app.use('/api/users/:id/articles', loginRequired, ensureCorrectUser, articleRoutes);
app.use('/api/users/:id/notes', loginRequired, ensureCorrectUser, noteRoutes);

// make middleware to handle routes without handlers
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(port, () => console.log(`Listening on PORT: ${port}`));
