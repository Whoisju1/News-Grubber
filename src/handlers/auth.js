import { User } from '../models';
import { createToken } from '../utils/createToken';

export async function signIn(req, res, next) {
  try {
    // find user
    const user = await User.findOne({
      username: req.body.username,
    });
    // if no user exists send back an error message of "User not found"
    if (!user) return next({ status: 401, message: 'User not found' });
    const { id = null, username = null, profileImageURL = null } = user;
    // if user exits check to see if the password sent to the server matches
    const isMatched = await user.comparePassword(req.body.password);
    // if password matches send back user information with a token
    if (isMatched) {
      const token = await createToken({
        id,
        username,
        profileImageURL,
      });
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
}

export async function signUp(req, res, next) {
  try {
    const user = await User.create(req.body);
    const { id, username, profileImageURL } = user;
    const token = await createToken({ id, username });
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
