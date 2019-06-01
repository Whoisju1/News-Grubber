import request from 'request';
import { load } from 'cheerio';

export default () =>
  new Promise((resolve, reject) => {
    const rootURL = 'https://www.cnet.com';
    request(rootURL, (err, response, body) => {
      if (err) reject(err);
      const $ = load(body);

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
            url,
          });
        }
      });
      console.log(JSON.stringify(2, linkedItems, null));
      resolve(linkedItems);
    });
  });
