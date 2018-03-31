const request = require('request');
const cheerio = require('cheerio');
const latestArticles = require('./scrapeHomepage');

module.exports = new Promise((resolve, reject) => {
  latestArticles()
    .then((data) => {
      const finalList = [];
      const addNewData = (list) => { // eslint-disable-line consistent-return
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
          const $ = cheerio.load(body);
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
    });
});

