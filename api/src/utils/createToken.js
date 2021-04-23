/* eslint-disable import/prefer-default-export */
import { sign } from 'jsonwebtoken';
import config from '../config';

const { jwtSecreteKey } = config;

/**
 * @description
 * @param {Object} user
 * @param {string} user._id - the id of the created user
 * @param {string} user.username - the username of the created user
 * @return {string} The generated created token
 */

 export const createToken = ({ _id, username }) => {
  const sub = {
    _id,
    username,
  };
  const token = sign({ sub }, jwtSecreteKey);
  return token;
};
