/* eslint no-underscore-dangle: 0 */
import { Article, User } from '../models';
import { getUserFromToken } from '../utils/getUserFromToken';
// make methods for manipulating article data

// make method to save article
export async function saveArticle(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const { id: userID } = getUserFromToken(token);

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
    const article = await Article.create({
      url,
      title,
      subTitle,
      image,
      author,
      publicationDate,
    });

    // return an error message if article already exists
    const count = await Article.count({ url }).where({ user: userID });
    if (count)
      return next({
        status: 400,
        message: 'This article is already in your collection.',
      });

    article.user = userID;
    article.save();

    // find user and push push article id into it's reference
    const foundUser = await User.findById(userID);
    foundUser.articles.push(article._id);
    await foundUser.save();

    // find article and referenced user and send it to the client
    const foundArticle = await Article.findById(article._id).populate('user', {
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
}

export async function getArticles(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const { id } = getUserFromToken(token);
    const articles = await Article.find({}).where({ user: id });
    return res.status(200).json(articles);
  } catch (e) {
    return next(e);
  }
}

export async function deleteArticle(req, res, next) {
  try {
    // get article id from the request body
    const { id } = req.params;
    // find the article and then remove it
    const foundArticle = await Article.findById(id);
    await foundArticle.remove();
    return res.status(200).json('Article deleted');
  } catch (e) {
    return next(e);
  }
}

export async function getOneArticle(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const { id } = getUserFromToken(token);
    const foundArticle = await Article.findById(req.params.id).where({
      user: id,
    });
    return res.status(200).json(foundArticle);
  } catch (e) {
    return next(e);
  }
}
