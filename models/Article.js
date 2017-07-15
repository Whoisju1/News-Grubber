const mongoose = require("mongoose");
const mongooseUniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;
const commentSchema = require('./comment');

const articleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    subTitle: {
        type: String
    },
    content: {
        type: String
    },
    author: {
        type: String
    },
    datePublished: {
        type: String
    },
    url: {
        type: String,
        unique: true,
        required: true
    },
    comment: [commentSchema]
});

articleSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model("Article", articleSchema);