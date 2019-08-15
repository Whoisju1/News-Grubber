/* eslint-disable import/prefer-default-export */
import { sign } from 'jsonwebtoken';
import config from '../config';

const { jwtSecreteKey } = config;

export const createToken = async ({ id, username, profileImageURL }) => {
  const sub = {
    id,
    username,
    profileImageURL,
  };
  const token = sign({ sub }, jwtSecreteKey);
  return token;
};
