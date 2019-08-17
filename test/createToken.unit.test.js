/* eslint-disable no-underscore-dangle */
import '@babel/polyfill';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import faker from 'faker';
import { createToken } from '../src/utils/createToken';
import config from '../src/config';

describe('createToken function', () => {
  const _id = `${Types.ObjectId()}`;

  const fakeUser = {
    _id,
    username: faker.internet.userName(),
    profileImageURL: faker.internet.url(),
  };

  const token = createToken(fakeUser);

  it('should return a valid token when valid arguments are passed', () => {
    expect(token).toBeString();
  });

  it('should create a token that returns the same object passed as params when decoded', () => {
    expect(jwt.verify(token, config.jwtSecreteKey)).toMatchObject({
      sub: fakeUser,
    });
  });
});
