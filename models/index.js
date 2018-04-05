const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.Promise = Promise;
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost/newsgrubber';

mongoose.connect(mongoURI, {
  keepAlive: true,
});

module.exports.User = require('./user');
