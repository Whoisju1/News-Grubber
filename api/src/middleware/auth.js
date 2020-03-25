/* eslint-disable import/prefer-default-export */
/* eslint-disable consistent-return */
import { verify } from 'jsonwebtoken';
import { model } from 'mongoose';
import config from '../config';
import { AuthorizationError } from '../customErrors';

const User = model('User');
const { jwtSecreteKey } = config;

// make sure the user is logged in - Authentication
export function loginRequired(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    verify(token, jwtSecreteKey, (err, decoded) => {
      if (decoded) return next();
      next({
        status: 401,
        message: 'Please log in first',
      });
    });
  } catch (e) {
    next({ status: 401, message: 'Please log in first' });
  }
}

export async function userMustExistMiddleware({ headers }, res, next) {
  try {
    const token = headers.authorization.split(' ')[1];
    const decoded = verify(token, jwtSecreteKey);
    if (!decoded) throw new AuthorizationError();
    const {
      sub: { _id },
    } = decoded;
    const count = await User.count({ _id });
    if (!count) throw new AuthorizationError();
    next();
  } catch (err) {
    next(err);
  }
}
