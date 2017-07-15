const express = require('express');
const router = express.Router();
const Article = require('./../models/Article');
// const bodyParser = require('body-parser');

router.get('/article/:id', (req, res) => {
    let id = req.params.id;

    Article.find({_id:id}, (err, doc) => {
        if (err) return console.error('Something went wrong', err);
        res.render('article', doc[0]);
        console.log(`Article retrieved from database, Title: ${doc[0].title}`);
    });
});

router.post('/comment/:id', (req, res) => {
            let id = req.params.id;
            // let comment = req.body.newComment;
            console.log(req.body);
            Article.findById(id, (err, doc) => {
                if (err) return console.error('error', err);
                // console.log('doc found: ', doc.title);
                res.send(req.body);
            });
            // res.redirect(`/article/${id}`);
        });

    
module.exports = router;