const request = require('request');
const cheerio = require('cheerio');

module.exports = () =>
  new Promise((resolve, reject) => {
    console.log('------------ SCRAPPING ----------');
    const rootURL = 'https://www.cnet.com';
    request(rootURL, (err, response, body) => {
      if (err) reject(err);
      const $ = cheerio.load(body);

      const linkedItems = [];

      $('section div.item').each(function each() {
        // grab needed information from specified element
        const title = $(this)
          .find('h3')
          .text();
        const subTitle = $(this)
          .find('p')
          .text();
        const image = $(this)
          .find('figure > a > span > img')
          .attr('src');
        const url = `${rootURL}${$(this)
          .find('h3 > a')
          .attr('href')}`;
        // only push into array if all the information is available
        if (title && subTitle && image) {
          linkedItems.push({
            title,
            subTitle,
            image,
            url
          });
        }
      });
      console.log(JSON.stringify(2, linkedItems, null));
      resolve(linkedItems);
    });
  });
