const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.Promise = Promise;
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI, {
  keepAlive: true,
});

module.exports.User = require('./user');
module.exports.Article = require('./article');
module.exports.Note = require('./note');
