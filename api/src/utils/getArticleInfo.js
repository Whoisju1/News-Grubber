import request from 'request-promise';
import { load } from 'cheerio';
import getLatestArticles from './scrapeHomepage';

export const getScrappedArticles = async () => {
  const scrappedArticles = [];

  const latestArticles = await getLatestArticles();

  // eslint-disable-next-line no-restricted-syntax
  for await (const articleInfo of latestArticles) {
    const { url } = articleInfo;

    const body = await request(url);

    // scrape article page
    const $ = load(body);
    const profileInfo = $('[section="author"]');

    // get author info
    const name =
      profileInfo
        .find('.c-assetAuthor_meta > .c-assetAuthor_authors > a.author')
        .text() || null;
    const authorInfo = profileInfo.find('.author').attr('href') || null;

    // get date & time of publication
    const date =
      profileInfo
        .find('.c-assetAuthor_meta > .c-assetAuthor_date > time')
        .text() || null;
    const time = profileInfo.find('.formattedTime').text() || null;

    const author = { name, authorInfo };
    author.authorInfo = `https://www.cnet.com${author.authorInfo}`;

    const publicationDate = { date, time };

    // put author and time into one object
    const authorAndDate = { author, publicationDate };

    scrappedArticles.push({ ...articleInfo, ...authorAndDate });
  }
  return scrappedArticles;
};

export default new Promise((resolve, reject) => {
  getLatestArticles()
    .then(data => {
      const finalList = [];
      // eslint-disable-next-line consistent-return
      const addNewData = list => {
        const [first, ...remaining] = list;
        /*
          if all the data have been processed
          in which first will not be falsy since
          there is nothing left in the array to process
        */
        if (!first) return resolve(finalList);

        // get url from articleInfo
        const { url } = first;

        // scrape article page
        request(url, (err, response, body) => {
          if (err) reject(err);
          const $ = load(body);
          const profileInfo = $('[section="author"]');

          // get author info
          const name = profileInfo.find('.author > span').text() || null;
          const authorInfo = profileInfo.find('.author').attr('href') || null;

          // get date & time of publication
          const date = profileInfo.find('.formattedDate').text() || null;
          const time = profileInfo.find('.formattedTime').text() || null;

          const author = { name, authorInfo };
          const publicationDate = { date, time };

          // put author and time into one object
          const authorAndDate = { author, publicationDate };

          // if there is still call the addData function with remaining data
          finalList.push({ ...first, ...authorAndDate });
          if (remaining) addNewData(remaining);
        });
      };

      addNewData(data);
    })
    .catch(err => resolve(err));
});
