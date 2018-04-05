const db = require('../models');
const jwt = require('jsonwebtoken');

exports.SignIn = function (req, res, next) {}; // eslint-disable-line

exports.signUp = async function signUp(req, res, next) {
  try {
    const user = await db.User.create(req.body);
    const { id, username, profileImageURL } = user;
    const token = jwt.sign({
      id,
      username,
      profileImageURL,
    }, process.env.SECRETE_KEY);

    return res.status(200).json({
      id,
      username,
      profileImageURL,
      token,
    });
  } catch (err) {
    if (err.code === 11000) {
      err.message = 'Sorry, that username and/or email email is taken';
    }
    return next({
      status: 400,
      message: err.message,
    });
  }
};
