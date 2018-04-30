const express = require('express');

const router = express.Router();
const { signUp, SignIn, unregister } = require('../handlers/auth');

router.post('/signup', signUp);
router.post('/signin', SignIn);
router.delete('/id/:id/unregister', unregister);

module.exports = router;
