import scrapedData from '../utils/getArticleInfo';

const home = async (req, res, next) => {
  try {
    console.log('---- home route ----');
    const article = await scrapedData;
    console.log(JSON.stringify('articles: ', 2, article, null));
    return res.render('index', { article });
  } catch (e) {
    return next(e);
  }
};

export default home;
