/* eslint no-underscore-dangle: 0 */
const db = require('../models');
// make methods for manipulating article data

// make method to save article
exports.saveArticle = async (req, res, next) => {
  try {
  // get id from params
    const { id: userID } = req.params;

    // get data from req.body
    const {
      url,
      title,
      subTitle = null,
      image = null,
      author,
      publicationDate,
    } = req.body;

    // create message
    const article = await db.Article.create({
      url,
      title,
      subTitle,
      image,
      author,
      publicationDate,
    });

    // find user and push push article id into it's reference
    const foundUser = await db.User.findById(userID);
    foundUser.articles.push(article._id);
    await foundUser.save();

    // find article and referenced user and send it to the client
    const foundArticle = await db.Article.findById(article._id).populate('user', {
      username: true,
    });
    return res.status(200).json(foundArticle);
  } catch (error) {
    return next(error);
  }
};
exports.getArticle = async (req, res, next) => {}; // eslint-disable-line no-unused-vars
exports.deleteArticle = async (req, res, next) => {}; // eslint-disable-line no-unused-vars
exports.addNote = async (req, res, next) => {}; // eslint-disable-line no-unused-vars
exports.deleteNote = async (req, res, next) => {}; // eslint-disable-line no-unused-vars
