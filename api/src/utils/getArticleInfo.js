import got from 'got';
import { load } from 'cheerio';
import getLatestArticles from './scrapeHomepage';

export const getScrappedArticles = async () => {
  const latestArticles = await getLatestArticles();

  const arts = latestArticles.map(async articleInfo => {
    const { url } = articleInfo;

    const { body } = await got(url);

    // scrape article page
    const $ = load(body);
    const profileInfo = $('[section="author"]');

    // get author info
    const name =
      profileInfo
        .find(
          'div.c-assetAuthor_meta > div.c-assetAuthor_authors > span > a.author'
        )
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

    return { ...articleInfo, ...authorAndDate };
  });

  const scrappedArticles = (await Promise.allSettled(arts)).map(
    ({ value }) => value
  );
  return scrappedArticles;
};

const getArticleInfo = async () => {
  const data = await getLatestArticles();
  const finalList = [];
  // eslint-disable-next-line consistent-return
  const addNewData = async list => {
    const [first, ...remaining] = list;
    /*
      if all the data have been processed
      in which first will not be falsy since
      there is nothing left in the array to process
    */
    if (!first) return finalList;

    // get url from articleInfo
    const { url } = first;

    // scrape article page
    const { body } = await got(url);
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
  };

  await addNewData(data);
};

export default getArticleInfo;
