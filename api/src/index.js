/* eslint-disable no-console */
import config from './config';
import { app } from './server';
import './models';
import redisClient from './services/redis';
import { getScrappedArticles } from './utils/getArticleInfo';
import constants from './constants';
import logger from './utils/logger';

const { FETCHED_ARTICLES } = constants.redis.keys;

const { port } = config;

// cache articles on startup and then every 10 minutes
const updateCache = async () => {
  const articles = await getScrappedArticles();
  redisClient.set(FETCHED_ARTICLES, JSON.stringify(articles));
};

updateCache();

setInterval(async () => {
  await updateCache();
}, 1000 * 60 * 10);

app.listen(port, () => logger.info(`Listening on port ${port}`));
