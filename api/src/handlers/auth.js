import UserService from '../services/userService';
import { User } from '../models';
import { createToken } from '../utils/createToken';
import { getUserFromToken } from '../utils/getUserFromToken';
import { AuthenticationError } from '../customErrors';

const userService = new UserService();


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
    // if password doesn't match throw authentication error
    throw new AuthenticationError('Wrong password.');
  } catch (err) {
    return next(err);
  }
}

export async function signUp(req, res, next) {
  try {
    const user = await userService.create(req.body);
    return res.status(200).json(user);
  } catch (err) {
    if (err.code === 11000) {
      const error = new AuthenticationError('Sorry, username already taken.');
      return next(error);
    }
    return next(err);
  }
}

export async function unregister(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const {
      sub: { _id: userID },
    } = getUserFromToken(token);
    console.log({ userID });
    const _id = await userService.delete(userID);
    console.log({ _id });
    return res.status(202).json({
      deletedUser: { _id },
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
