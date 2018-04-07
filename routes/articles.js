const express = require('express');

const router = express.Router({ mergeParams: true });

const {
  saveArticle, getArticles, deleteArticle, getOneArticle,
} = require('../handlers/articles');

router.route('/')
  .post(saveArticle)
  .get(getArticles)
  .delete(deleteArticle);

router.route('/one')
  .get(getOneArticle);

module.exports = router;
