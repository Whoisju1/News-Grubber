import scrapedData from '../utils/getArticleInfo';

const home = async (_req, res, next) => {
  try {
    const article = await scrapedData;
    return res.render('index', { article });
  } catch (e) {
    return next(e);
  }
};

export default home;
