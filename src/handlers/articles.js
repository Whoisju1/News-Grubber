/* eslint no-underscore-dangle: 0 */
import { Types } from 'mongoose';
import { Article, User } from '../models';
import { getUserFromToken } from '../utils/getUserFromToken';
// make methods for manipulating article data

// make method to save article
export async function saveArticle(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const {
      sub: { _id: userID },
    } = getUserFromToken(token);
    const duplicateErr = new Error(
      'This article is already in your collection.'
    );
    duplicateErr.status = 401;

    // get data from req.body
    const { url } = req.body;

    // check to see if article already exists and if it does return an error message instead
    const count = await Article.count({ url }).where({ user: userID });
    if (count) return next(duplicateErr);

    // if all is well create the article
    const article = await new Article(req.body);

    article.user = userID;
    article.save();

    // find user and push push article id into it's reference
    const foundUser = await User.findById(userID);
    foundUser.articles.push(article._id);
    await foundUser.save();

    // find article and referenced user and send them to the client
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
    const {
      sub: { _id },
    } = getUserFromToken(token);
    const articles = await Article.aggregate([
      { $match: { user: Types.ObjectId(_id) } },
      { $sort: { createdAt: -1 } },
    ]);

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
    return res.status(200).json(foundArticle);
  } catch (e) {
    return next(e);
  }
}

export async function getOneArticle(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const {
      sub: { _id },
    } = getUserFromToken(token);
    const foundArticle = await Article.findById(req.params.id).where({
      user: _id,
    });
    return res.status(200).json(foundArticle);
  } catch (e) {
    return next(e);
  }
}

export async function getAllNotes(req, res, next) {
  try {
    const { id } = req.params;
    const [{ notes }] = await Article.aggregate([
      { $match: { _id: Types.ObjectId(id) } },
      { $project: { _id: 0, notes: 1 } },
    ]);

    return res.status(200).json(notes);
  } catch (error) {
    return next(error);
  }
}
