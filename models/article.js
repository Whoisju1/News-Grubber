const mongoose = require('mongoose');
const User = require('./user');

const { Schema } = mongoose;

const articleSchema = new Schema({
  url: {
    type: String,
    required: true,
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

articleSchema.pre('remove', async function (next) { // eslint-disable-line consistent-return
  try {
    const user = await User.findById(this.user);
    user.article.remove(this.id);
    await user.save();
  } catch (err) {
    return next(err);
  }
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
