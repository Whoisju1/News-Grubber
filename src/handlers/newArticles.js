/* eslint-disable import/prefer-default-export */
import scrapedData from '../utils/getArticleInfo';

export const getScrappedArticles = async (_req, res, next) => {
  try {
    console.log('------ inside of new Articles route handler ------');
    const articles = await scrapedData;
    return res.status(200).json({ articles });
  } catch (e) {
    return next(e);
  }
};
