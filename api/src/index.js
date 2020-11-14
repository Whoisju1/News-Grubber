/* eslint-disable no-console */
import config from './config';
import { app } from './server';
import './models';
import { client as redisClient } from './services/redis';
import { getScrappedArticles } from './utils/getArticleInfo';
import constants from './constants';

const { FETCHED_ARTICLES } = constants.redis.keys;
const { port = 5000 } = config;

// cache articles on startup and then every 10 minutes
const updateCache = async () => {
  const articles = await getScrappedArticles();
  redisClient.set(FETCHED_ARTICLES, JSON.stringify(articles));
};

updateCache();

setInterval(async () => {
  await updateCache();
}, 1000 * 60 * 10);

app.listen(port, () => console.log(`Listening on port ${port}`));
