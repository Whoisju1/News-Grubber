const mongoose = require("mongoose");
const mongooseUniqueValidator = require("mongoose-unique-validator");
const validator = require("validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    required: true
  },
  email: {
    type: String,
    minlength: 1,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: validator.isEmail,
      message: "{VALUE} is not a valid email"
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [
    {
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }
  ]
});

const User = mongoose.model(userSchema, userSchema);

module.exports = User;
