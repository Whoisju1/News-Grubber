/* eslint no-console: 0 */
/* eslint consistent-return: 0 */

const express = require('express');
const mongoose = require('mongoose');
const request = require('request');
const cheerio = require('cheerio');
const handleBars = require('express-handlebars');
const fs = require('fs');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');


// import article schema
const Article = require('./models/Article');

const app = express();
const port = process.env.PORT || 3000;

// Use method override
app.use(methodOverride('_method'));

app.use((req, res, next) => {
  const now = Date().toString();
  const log = `${now} | ${req.method} : ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', `${log}\n`, (err) => {
    if (err) console.error('Logging Error: ', err);
  });
  next();
});

app.use(express.static(`${__dirname}/public`));

// set view engine
app.engine('handlebars', handleBars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// register partials
handleBars.create({
  partialsDir: 'views/partials/',
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/News-Grubber', {
  useMongoClient: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Mongoose connected successfully'));

// import routes
app.use(require('./controller'));

// scrape site for more links to scrape
request('https://www.cnet.com/news/', (error, response, html) => {
  const $ = cheerio.load(html);

  const urlArray = [];
  const contentObj = [];


  const storeContent = () => {
    // populate articles collection
    contentObj.forEach((articleData) => {
      const article = new Article({
        title: articleData.title,
        subTitle: articleData.subtitle,
        content: articleData.content,
        author: articleData.author,
        datePublished: articleData.datePublished,
        url: articleData.url,
      });
      article.save((err) => {
        if (err) return console.error('DATA NOT STORED: ', err);
        console.log('scraped data stored');
      });
    });
  };

  $('.assetThumb').each((i, element) => {
    const link = $(element);

    if (link[0].attribs.href !== undefined) {
      urlArray.push(link[0].attribs.href);
    }
  });
  // iterate through links
  let count = 0;

  urlArray.forEach((url) => {
    // scrape each link
    request(`https://www.cnet.com${url}`, (error, response, html) => {
      const $ = cheerio.load(html);
      const title = $('h1').text().trim();
      const subtitle = $('.article-dek').text();
      const pObject = $('#article-body > div.col-7.article-main-body.row  p');
      const articleBodyArray = [];
      const date = $('#article-body > div.col-2.leftColumn > div.authorInfo > ul > li > div.profileInfo > time > span.formattedDate').text();
      const time = $('#article-body > div.col-2.leftColumn > div.authorInfo > ul > li > div.profileInfo > time > span.formattedTime').text();
      const datePublished = `${date} ${time}`;
      const articleURL = `https://www.cnet.com${url}`;
      const author = $('#article-body > div.col-2.leftColumn > div.authorInfo > ul > li > div.profileInfo > a > span').text();


      // loop through every article paragraph
      for (let i = 0; i < pObject.length; i++) { // eslint-disable-line no-plusplus
        // grab text from each paragraph and push into articleBodyArray array
        const singleArticleParagraph = $(`#article-body > div.col-7.article-main-body.row > p:nth-child(${i})`).contents();
        articleBodyArray.push(singleArticleParagraph);
      }

      // turn array of strings into a single string and place...
      // a space after each one to differentiate paragraphs
      const content = articleBodyArray.join('<br>');

      // put put content from each page into an object
      const stuffToDisplay = {
        title,
        subtitle,
        content,
        url: articleURL,
        datePublished,
        author,
      };

      // push each created object into an array with each iteration
      contentObj.push(stuffToDisplay);

      // increments with every loop
      count += count;
      // call function when all 10 objects have been pushed into array (when iteration is complete)
      if (count === 10) {
        storeContent();
      }
    });
  });
});

app.listen(port, () => console.log(`Listening on PORT: ${port}`));
