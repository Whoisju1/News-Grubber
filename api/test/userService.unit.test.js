import '@babel/polyfill';
import UserService from '../src/services/userService';
import { createUser } from './fixtures/db';
import { model } from 'mongoose';
import faker from 'faker';

const User = model('User');

describe('UserService', () => {
  const userService = new UserService();
  describe('create method', () => {
    const prospectiveUser = createUser();
    let createdUser;
    beforeEach(async () => {
      createdUser = await userService.create(prospectiveUser);
    });
    afterEach(async () => {
      const user = await User.findById(prospectiveUser._id);
      await user.remove();
    });

    it('should return a created user', async () => {

      expect(`${createdUser._id}`).toBe(`${prospectiveUser._id}`);
      expect(createdUser.username.toLowerCase()).toBe(prospectiveUser.username.toLowerCase());
      expect(createdUser).toHaveProperty('token');
    });
  });

  describe('delete method', () => {
    it('should exist', () => {
      expect(userService.delete).toBeDefined();
    });

    it('should delete user', async () => {
      const user = await userService.create({
        password: faker.internet.password(),
        username: faker.internet.userName(),
      });
      const deletedUserId = await userService.delete(user._id);

      expect(`${user._id}`).toBe(`${deletedUserId}`)
    });
  });
});
