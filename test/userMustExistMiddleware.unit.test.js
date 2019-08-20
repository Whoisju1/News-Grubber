import { Types } from 'mongoose';
import '@babel/polyfill';
import { user, initDb, emptyDb } from './fixtures/db';
import { createToken } from '../src/utils/createToken';
import { userMustExistMiddleware } from '../src/middleware/auth';

describe('userMustExistMiddleware', () => {
  beforeEach(async () => {
    await emptyDb();
    await initDb();
  });

  const unknownUser = { ...user, _id: Types.ObjectId() };
  const badToken = createToken(unknownUser);

  const next = jest.fn();

  const invalidReq = {
    headers: {
      authorization: `Bearer ${badToken}`,
    },
  };

  describe('When nonexistent user is derived from token', () => {
    it('should return a 404 Unauthorized error if', async () => {
      await userMustExistMiddleware(invalidReq, {}, next);
      expect(next).toBeCalledWith(
        expect.toBeObject({ status: 401, message: 'Unauthorized' })
      );
    });
  });
});
