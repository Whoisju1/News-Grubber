/* eslint-disable import/prefer-default-export */
import { sign } from 'jsonwebtoken';

export const createToken = async ({ id, username, profileImageURL }) => {
  const sub = {
    id,
    username,
    profileImageURL,
  };
  const token = sign({ sub }, process.env.SECRETE_KEY);
  return token;
};
