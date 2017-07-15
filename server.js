const express = require("express");
const mongoose = require('mongoose');
const request = require('request');
const cheerio = require('cheerio');
const exphbs  = require('express-handlebars');
const fs = require('fs');
const logger = require('logger');

const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
    let now = Date().toString();
    let log = `${now} | ${req.method} : ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        console.log('Unable to append to server.log');
    });
    next();
});

app.use(express.static(__dirname + '/public'));

// hbs.registerPartials(__dirname + '/views/partials');
//set view engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//connect to mongoose server
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/News-Grubber", {
    useMongoClient: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("Mongoose connected successfully"));

// import routes 
app.use(require('./controller'));


app.listen(port, () => console.log(`Listening on PORT: ${port}`));
