import mongoose, { Schema as _Schema, model } from 'mongoose';
import { hashSync, compareSync } from 'bcrypt';

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  profileImageURL: {
    type: String,
  },
  articles: [
    {
      type: _Schema.Types.ObjectId,
      ref: 'Article',
    },
  ],
});

userSchema.pre('save', function pre(next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashedPassword = hashSync(this.password, 10);
    this.password = hashedPassword;
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.comparePassword = function comparePassword(
  candidatePassword,
  next
) {
  try {
    const isMatch = compareSync(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    return next(err);
  }
};

const User = model('User', userSchema);

export default User;
