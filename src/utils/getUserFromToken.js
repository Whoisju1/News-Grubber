/* eslint-disable import/prefer-default-export */
import { verify } from 'jsonwebtoken';

export const getUserFromToken = token =>
  new Promise((resolve, reject) => {
    verify(token, process.env.SECRETE_KEY, (err, decoded) => {
      resolve(decoded.sub);
      reject(err);
    });
  });
