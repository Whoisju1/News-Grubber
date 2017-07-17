const express = require("express");
const mongoose = require('mongoose');
const request = require('request');
const cheerio = require('cheerio');
const exphbs  = require('express-handlebars');
const fs = require('fs');
const logger = require('logger');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');



// import article schema
const Article = require('./models/Article');

const app = express();
const port = process.env.PORT || 3000;

// Use method override
app.use(methodOverride('_method'));

app.use((req, res, next) => {
    let now = Date().toString();
    let log = `${now} | ${req.method} : ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        // console.log('Unable to append to server.log');
    });
    next();
});

app.use(express.static(__dirname + '/public'));

//set view engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// register partials
var hbs = exphbs.create({
    partialsDir:'views/partials/'
    
});

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json 
app.use(bodyParser.json());
 
// app.use(function (req, res) {
//   res.setHeader('Content-Type', 'text/plain');
//   res.write('you posted:\n');
//   res.end(JSON.stringify(req.body, null, 2));
// });

//connect to mongoose server --- PRODUCTION MODE
// mongoose.Promise = global.Promise;
// mongoose.connect("mongodb://heroku_kz3klbvm:136v7ks0jj93i39t9cbkllrger@ds157641.mlab.com:57641/heroku_kz3klbvm", {
//     useMongoClient: true
// });
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", () => console.log("Mongoose connected successfully"));

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/News-Grubber", {
    useMongoClient: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("Mongoose connected successfully"));

//connect to mongoose server --- DEV MODE
// mongoose.connect("mongodb://localhost:27017/News-Grubber", {
//     useMongoClient: true
// });
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", () => console.log("Mongoose connected successfully"));

// import routes 
app.use(require('./controller'));

// scrape site for more links to scrape
request("https://www.cnet.com/news/", function (error, response, html) {

    var $ = cheerio.load(html);

    var urlArray = [];
    let contentObj = [];


    let storeContent = () => {

        // populate articles collection        
        contentObj.forEach(function (articleData) {
            let article = new Article({
                title: articleData.title,
                subTitle: articleData.subtitle,
                content: articleData.content,
                author: articleData.author,
                datePublished: articleData.datePublished,
                url: articleData.url
            });
            article.save((err) => {
                if (err) {
                    console.log('Data not stored', err);
                }
                console.log("scraped data stored");
            });
        });
    };

    $(".assetThumb").each(function (i, element) {

        var link = $(element);

        if (link[0].attribs.href !== undefined) {
            urlArray.push(link[0].attribs.href);
        }

    });
    // iterate through links
    var count = 0;

    urlArray.forEach(function (url) {
        // scrape each link
        request("https://www.cnet.com" + url, (error, response, html) => {
            let $ = cheerio.load(html);
            let title = $("h1").text().trim();
            let subtitle = $(".article-dek").text();
            let pObject = $("#article-body > div.col-7.article-main-body.row  p");
            let articleBodyArray = [];
            let date = $("#article-body > div.col-2.leftColumn > div.authorInfo > ul > li > div.profileInfo > time > span.formattedDate").text();
            let time = $("#article-body > div.col-2.leftColumn > div.authorInfo > ul > li > div.profileInfo > time > span.formattedTime").text();
            let datePublished = `${date} ${time}`;
            let articleURL = `https://www.cnet.com${url}`;
            let author = $("#article-body > div.col-2.leftColumn > div.authorInfo > ul > li > div.profileInfo > a > span").text();


            // loop through every article paragraph 
            for (var i = 0; i < pObject.length; i++) {

                // grab text from each paragraph and push into articleBodyArray array
                var singleArticleParagraph = $(`#article-body > div.col-7.article-main-body.row > p:nth-child(${i})`).contents();
                articleBodyArray.push(singleArticleParagraph);
            }

            // turn array of strings into a single string and place a space after each one to differentiate paragraphs
            let content = articleBodyArray.join("<br>");

            // put put content from each page into an object
            let stuffToDisplay = {
                title: title,
                subtitle: subtitle,
                content: content,
                url: articleURL,
                datePublished: datePublished,
                author: author
            };

            // push each created object into an array with each iteration
            contentObj.push(stuffToDisplay);

            // increments with every loop
            count++;
            // call function when all 10 objects have been pushed into array (when iteration is complete)
            if (count === 10) {
                storeContent();
            }
        });

    });


});

app.listen(port, () => console.log(`Listening on PORT: ${port}`));
