/* eslint-disable import/prefer-default-export */
import { sign } from 'jsonwebtoken';
import config from '../config';

const { jwtSecreteKey } = config;

export const createToken = ({ _id, username }) => {
  const sub = {
    _id,
    username,
  };
  const token = sign({ sub }, jwtSecreteKey);
  return token;
};
