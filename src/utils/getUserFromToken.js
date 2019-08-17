/* eslint-disable import/prefer-default-export */
import { verify } from 'jsonwebtoken';
import config from '../config';

const { jwtSecreteKey } = config;

export const getUserFromToken = token =>
  new Promise((resolve, reject) => {
    verify(token, jwtSecreteKey, (err, decoded) => {
      resolve(decoded.sub);
      reject(err);
    });
  });
