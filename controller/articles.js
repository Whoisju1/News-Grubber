const express = require('express');
const router = express.Router();
const Article = require('./../models/Article');

// route to display an individual article 
router.get('/article/:id', (req, res) => {
    let id = req.params.id;

    Article.find({_id:id}, (err, doc) => {
        if (err) return console.error('Something went wrong', err);
        res.render('article', doc[0]);
        console.log(`Article retrieved from database, Title: ${doc[0].title}`);
    });
});

// route to post comments
router.post('/comment/:id', (req, res) => {
            let id = req.params.id;
            let comment = req.body.newComment;

            Article.findById(id)
            .then((article) => {
                article.comment.push({body: comment});
                article.save()
                .then(res.redirect(`/article/${id}`));
            });
});
    
module.exports = router;