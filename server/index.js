/* eslint no-console: 0 */
/* eslint consistent-return: 0 */

const express = require('express');
const handleBars = require('express-handlebars');
const fs = require('fs');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

// load environment variables
require('dotenv').config();

const errorHandler = require('../handlers/error');
const authRoutes = require('../routes/auth');
const articleRoutes = require('../routes/articles');
require('../models');

const app = express();
const port = process.env.PORT || 3000;

// Use method override
app.use(methodOverride('_method'));

app.use((req, res, next) => {
  const now = Date().toString();
  const log = `${now} | ${req.method} : ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', `${log}\n`, (err) => {
    if (err) console.error('Logging Error: ', err);
  });
  next();
});

app.use(express.static(`${__dirname}/../public`));

// set view engine
app.engine('handlebars', handleBars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// register partials
handleBars.create({
  partialsDir: '../views/partials/',
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// mongoose.Promise = global.Promise;
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/News-Grubber');
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', () => console.log('Mongoose connected successfully'));

// import routes
app.use('/api/auth', authRoutes);
app.use('/api/users/:id/articles', articleRoutes);

// app.use(require('../controller'));
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(port, () => console.log(`Listening on PORT: ${port}`));
