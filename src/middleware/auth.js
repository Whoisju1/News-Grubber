/* eslint-disable import/first */
/* eslint consistent-return: 0 */
require('dotenv').load();

import { verify } from 'jsonwebtoken';

// make sure the user is logged in - Authentication
export function loginRequired(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    verify(token, process.env.SECRETE_KEY, (err, decoded) => {
      if (decoded) return next();
      return next({
        status: 401,
        message: 'Please log in first',
      });
    });
  } catch (e) {
    return next({ status: 401, message: 'Please log in first' });
  }
}

// make sure you have the correct user - Authorization
export function ensureCorrectUser(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const { SECRETE_KEY } = process.env;
    verify(token, SECRETE_KEY, (err, decoded) => {
      if (decoded && decoded.id === req.params.id) return next();
      return next({
        status: 401,
        message: 'Unauthorized',
      });
    });
  } catch (e) {
    return next({ status: 401, message: 'Unauthorized' });
  }
}
