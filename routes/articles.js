const express = require('express');

const router = express.Router({ mergeParams: true });

const { saveArticle } = require('../handlers/articles');

router.route('/').post(saveArticle);

module.exports = router;
