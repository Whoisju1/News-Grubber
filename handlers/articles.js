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

    // return an error message if article already exists
    const count = await db.Article.count({ url }).where({ user: userID });
    if (count) return next({ status: 400, message: 'This article is already in your collection.' });

    article.user = userID;
    article.save();

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
    if (error.code === 11000) {
      return next({
        status: 400,
        message: 'This article is already in your collection.',
      });
    }
    return next(error);
  }
};

exports.getArticles = async (req, res, next) => {
  try {
    const { id } = req.params;
    const articles = await db.Article.find({}).where({ user: id });
    return res.status(200).json(articles);
  } catch (e) {
    return next(e);
  }
};

exports.deleteArticle = async (req, res, next) => {
  try {
    // get article id from the request body
    const { id } = req.body;
    // find the article and then remove it
    const foundArticle = await db.Article.findById(id);
    await foundArticle.remove();
    return res.status(200).json('Article deleted');
  } catch (e) {
    return next(e);
  }
};

exports.getOneArticle = async (req, res, next) => {
  try {
    const foundArticle = await db.Article.findById(req.body.id).where({ user: req.params.id });
    return res.status(200).json(foundArticle);
  } catch (e) {
    return next(e);
  }
};
