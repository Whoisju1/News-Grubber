const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.Promise = Promise;
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:news-grubber';

mongoose.connect(mongoURI, {
  keepAlive: true,
});

