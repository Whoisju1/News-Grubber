/* eslint-disable import/prefer-default-export */
import { promisify } from 'util';
import { getScrappedArticles as scrapeArticles } from '../utils/getArticleInfo';
import client from '../services/redis';
import constants from '../constants';

client.get = promisify(client.get);
client.set = promisify(client.set);

export const getScrappedArticles = async (_req, res, next) => {
  try {
    const { FETCHED_ARTICLES } = constants.redis.keys;
    const cachedArticles = JSON.parse(await client.get(FETCHED_ARTICLES));
    let articles;
    if (cachedArticles.length) {
      // If there is data in the cache then use it
      articles = cachedArticles;
    } else {
      // If there isn't data in the cache fetch articles and save it
      articles = await scrapeArticles();
      await client.set(FETCHED_ARTICLES, JSON.stringify(articles));
    }
    return res.status(200).json({ articles });
  } catch (e) {
    return next(e);
  }
};
