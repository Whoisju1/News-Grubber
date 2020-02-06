/* eslint-disable import/prefer-default-export */
import { getScrappedArticles as scrapeArticles } from '../utils/getArticleInfo';

export const getScrappedArticles = async (_req, res, next) => {
  try {
    const articles = await scrapeArticles();
    return res.status(200).json({ articles });
  } catch (e) {
    return next(e);
  }
};
