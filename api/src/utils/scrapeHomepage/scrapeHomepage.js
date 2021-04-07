import got from 'got';
import { load } from 'cheerio';

const getLatestArticles = async () => {
  const rootURL = 'https://www.cnet.com';
  const { body } = await got(rootURL);
  const $ = load(body);

  const linkedItems = [];

  $('div:nth-child(3) > section > div.latestScrollContainer div.row.item').each(
    function each() {
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
        const articleInfo = {
          title,
          subTitle,
          image,
          url,
        };

        linkedItems.push(articleInfo);
      }
    }
  );
  return linkedItems;
};

export default getLatestArticles;
