/* eslint-disable import/prefer-default-export */
/* eslint-disable consistent-return */
import { verify } from 'jsonwebtoken';
import config from '../config';

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
