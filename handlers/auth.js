const db = require('../models');
const jwt = require('jsonwebtoken');

exports.SignIn = async function (req, res, next) {
  try {
    // find user
    const user = await db.User.findOne({
      username: req.body.username,
    });
    // if no user exists send back an error message of "User not found"
    if (!user) return next({ status: 401, message: 'User not found' });
    const { id = null, username = null, profileImageURL = null } = user;
    // if user exits check to see if the password sent to the server matches
    const isMatched = await user.comparePassword(req.body.password);
    // if password matches send back user information with a token
    if (isMatched) {
      const token = jwt.sign(
        {
          id,
          username,
          profileImageURL,
        },
        process.env.SECRETE_KEY,
      );
      return res.status(200).json({
        id,
        username,
        profileImageURL,
        token,
      });
    }
    // if something doesn't match send an error
    return next({
      status: 400,
      message: 'Invalid password.',
    });
  } catch (err) {
    return next({
      status: 400,
      message: 'Oops! Something went wrong.',
    });
  }
};

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
      err.message = 'Sorry, that username is taken';
    }
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.unregister = async (req, res, next) => {
  try {
    const { id } = req.params;
    const doc = await db.User.findById(id);
    if (doc === null) {
      return next({
        status: 500,
        message: 'Something went wrong',
      });
    }
    const removedUser = await doc.remove();
    const response = {
      message: 'You\'ve been unregistered',
      id: removedUser._id,
    };
    return res.status(200).json(response);
  } catch (err) {
    return next(err);
  }
};
