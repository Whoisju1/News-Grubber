const express = require('express');

const router = express.Router();
const { signUp, SignIn, removeUser } = require('../handlers/auth');

router.post('/signup', signUp);
router.post('/signin', SignIn);
router.delete('/id/:id/unregister', removeUser);

module.exports = router;
