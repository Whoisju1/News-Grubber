const scrapedData = require('../utils/getArticleInfo');

const home = async (req, res, next) => {
  try {
    const article = await scrapedData;
    return res.render('index', { article });
  } catch (e) {
    return next(e);
  }
};

module.exports = home;
