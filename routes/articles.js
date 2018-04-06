const express = require('express');

const router = express.Router({ mergeParams: true });

const { saveArticle, getArticles } = require('../handlers/articles');

router.route('/')
  .post(saveArticle)
  .get(getArticles);

module.exports = router;
