import mongoose, { Schema as _Schema, model } from 'mongoose';
import User from './user';
import noteSchema from './note';

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
  notes: [noteSchema],
  user: {
    type: _Schema.Types.ObjectId,
    ref: 'User',
  },
});

// eslint-disable-next-line func-names
articleSchema.pre('remove', async function(next) {
  // eslint-disable-line consistent-return
  try {
    const user = await User.findById(this.user);
    user.articles.remove(this.id);
    return await user.save();
  } catch (err) {
    return next(err);
  }
});

const Article = model('Article', articleSchema);

export default Article;
