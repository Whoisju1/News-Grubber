import { User } from '../models';
import { createToken } from '../utils/createToken';
import { getUserFromToken } from '../utils/getUserFromToken';

export async function signIn(req, res, next) {
  try {
    // find user
    const user = await User.findOne({
      username: req.body.username,
    });

    // if no user exists send back an error message of "User not found"
    if (!user) return next({ status: 400, message: 'User not found.' });
    const { _id = null, username = null, profileImageURL = null } = user;
    // if user exits check to see if the password sent to the server matches

    const isMatched = await user.comparePassword(req.body.password, next);
    // if password matches send back user information with a token
    if (isMatched) {
      const token = await createToken({
        _id,
        username,
        profileImageURL,
      });
      return res.status(200).json({
        _id,
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
}

export async function signUp(req, res, next) {
  try {
    const user = await User.create(req.body);
    const { _id, username, profileImageURL } = user;
    const token = await createToken({ _id, username });
    return res.status(200).json({
      _id,
      username,
      profileImageURL,
      token,
    });
  } catch (err) {
    if (err.code === 11000) {
      const error = new Error('Sorry, username already taken.');
      error.status = 400;
      return next(error);
    }
    return next(err);
  }
}

export async function unregister(req, res, next) {
  try {
    // find user by specified id
    const user = await User.findById(req.locals.id);
    // then delete user from database
    const { _id: id = null } = await user.remove();
    return res.status(200).json({
      id,
      message: "You've been successfully unregistered",
    });
  } catch (e) {
    return next(e);
  }
}

export const getCurrentUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    const { sub } = getUserFromToken(token);

    return res.status(200).json(sub);
  } catch (error) {
    return next(error);
  }
};
