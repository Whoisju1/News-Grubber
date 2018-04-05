const express = require('express');

const router = express.Router();
const { signUp, SignIn } = require('../handlers/auth');

router.post('/signup', signUp);
router.post('/signin', SignIn);

module.exports = router;
