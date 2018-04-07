const express = require('express');

const router = express.Router({ mergeParams: true });

const { saveArticle, getArticles, deleteArticle } = require('../handlers/articles');

router.route('/')
  .post(saveArticle)
  .get(getArticles)
  .delete(deleteArticle);

module.exports = router;
