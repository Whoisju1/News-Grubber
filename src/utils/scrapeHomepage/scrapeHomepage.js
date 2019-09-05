import request from 'request';
import { load } from 'cheerio';

export default () =>
  new Promise((resolve, reject) => {
    const rootURL = 'https://www.cnet.com';
    request(rootURL, (err, response, body) => {
      if (err) return reject(err);
      const $ = load(body);

      const linkedItems = [];

      $(
        'div:nth-child(3) > section > div.latestScrollContainer div.row.item'
      ).each(function each() {
        // grab needed information from specified element
        const title = $(this)
          .find('h3')
          .text();

        const subTitle = $(this)
          .find('.row div p a')
          .text();
        const image = $(this)
          .find('img')
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
        // else {
        //   // eslint-disable-next-line prefer-promise-reject-errors
        //   const error = new Error('Could not retrieve articles');
        //   error.status = 500;
        //   reject(error);
        // }
      });
      return resolve(linkedItems);
    });
  });
