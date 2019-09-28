import '@babel/register';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import { app } from '../src/server';
import {
  createdUserCredentials,
  user,
  password,
  initDb,
  emptyDb,
} from './fixtures/db';

import config from '../src/config';
import { createToken } from '../src/utils/createToken';

describe('authRoute', () => {
  // /auth/singup
  beforeEach(async () => {
    await emptyDb();
    await initDb();
  });
  describe('`createUser` function', () => {
    it('should return a status of `200`', async () => {
      const response = await request(app)
        .post('/api/auth/signup')
        .send(createdUserCredentials)
        .expect(200);

      const parsedResponse = JSON.parse(response.text);
      expect({
        ...parsedResponse,
        username: parsedResponse.username.toLowerCase(),
      }).toEqual(
        expect.objectContaining({
          _id: parsedResponse._id,
          username: createdUserCredentials.username.toLowerCase(),
        })
      );
    });

    it('should should not return the `password` along with the data', async () => {
      const response = await request(app)
        .post('/api/auth/signup')
        .send(createdUserCredentials)
        .expect(200);

      expect(JSON.parse(response.text)).not.toHaveProperty('password');
    });

    it('should return a valid token', async () => {
      const response = await request(app)
        .post('/api/auth/signup')
        .send(createdUserCredentials)
        .expect(200);

      const parsedResponse = JSON.parse(response.text);

      const decoded = jwt.verify(parsedResponse.token, config.jwtSecreteKey);

      expect(decoded.sub.username.toLowerCase()).toBe(
        createdUserCredentials.username.toLowerCase()
      );
    });

    it('should return an error if you try to sign up the same user twice', async () => {
      await request(app)
        .post('/api/auth/signup')
        .send(createdUserCredentials)
        .expect(200);

      const response = await request(app)
        .post('/api/auth/signup')
        .send(createdUserCredentials)
        .expect(400);

      const parsedResponse = JSON.parse(response.text);

      expect(parsedResponse).toEqual({
        error: { message: 'Sorry, username already taken.' },
      });
    });
  });

  // /auth/signin
  describe('SignIn route', () => {
    describe('When user submits correct credentials', () => {
      it("should return the user's username, _id, and token", async () => {
        const response = await request(app)
          .post('/api/auth/signin')
          .send({
            username: user.username,
            password,
          })
          .expect(200);

        const parsedResponse = JSON.parse(response.text);

        expect({
          username: parsedResponse.username.toLowerCase(),
          _id: parsedResponse._id,
        }).toEqual({
          username: user.username.toLowerCase(),
          _id: user._id,
        });
      });
    });

    describe('when wrong password is submitted', () => {
      it('should should return a status of 400 and the error message `User not found.`', async () => {
        const resp = await request(app)
          .post('/api/auth/signin')
          .send({ username: 'nonexistent_username', password: user.password })
          .expect(400);

        const parsedResponse = JSON.parse(resp.text);

        expect(parsedResponse).toEqual({
          error: {
            message: 'User not found.',
          },
        });
      });
    });

    describe('when wrong password is submitted', () => {
      it('should should return a status of 404 and the error message `Invalid password.`', async () => {
        const err = new Error('Invalid password.');
        err.status = 400;
        const resp = await request(app)
          .post('/api/auth/signin')
          .send({ username: user.username, password: 'wrong password' })
          .expect(400);

        const parsedResponse = JSON.parse(resp.text);
        expect(parsedResponse).toEqual({
          error: {
            message: 'Invalid password.',
          },
        });
      });
    });
  });

  // /auth/user
  describe('get Current user route', () => {
    it('should return the user', async () => {
      const token = createToken(user);
      const response = await request(app)
        .get('/api/auth/user')
        .set('authorization', `Bearer ${token}`)
        .expect(200);

      const parsedResponse = JSON.parse(response.text);
      expect(parsedResponse).toEqual({
        _id: user._id,
        username: user.username,
      });
    });
  });

  afterAll(async () => {
    await emptyDb();
  });
});
