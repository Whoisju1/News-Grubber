import '@babel/register';
import request from 'supertest';
import { model } from 'mongoose';
import jwt from 'jsonwebtoken';
import { app } from '../src/server';
import { createdUserCredentials } from './fixtures/db';
import config from '../src/config';

const User = model('User');
describe('authRoute', () => {
  describe('`createUser` function', () => {
    beforeEach(async () => {
      await User.deleteMany();
    });

    it('should return a status of `200`', async () => {
      await request(app)
        .post('/api/auth/signup')
        .send(createdUserCredentials)
        .expect(200);
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

      expect(jwt.verify(parsedResponse.token, config.jwtSecreteKey));
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
});
