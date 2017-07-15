const express = require('express');
const router = express.Router();
const Article = require('./../models/Article');

router.use(require('./articles'));

router.get('/', (req, res) => {

    Article.find({}, (err, doc) => {
        if(err) return console.error('error', err);
        let articles = {doc};

        res.render('index', articles);
    });
    
});

module.exports = router;