const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const commentSchema = new Schema({
    body: {
        type: String,
        trim: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

module.exports = commentSchema;