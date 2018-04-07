const mongoose = require('mongoose');

const { Schema } = mongoose;

const noteSchema = new Schema({
  note: {
    type: String,
    required: true,
  },
  timeCreated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = noteSchema;
