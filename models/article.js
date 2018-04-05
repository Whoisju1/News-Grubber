const mongoose = require('mongoose');

const { Schema } = mongoose;

const articleSchema = new Schema({
  url: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  subTitle: {
    type: String,
    trim: true,
  },
  image: String,
  author: {
    name: {
      type: String,
      trim: true,
    },
    authorInfo: {
      type: String,
      trim: true,
    },
  },
  publicationDate: {
    date: String,
    time: String,
  },
  notes: [{ type: String }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
