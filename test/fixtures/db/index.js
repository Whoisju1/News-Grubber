import faker from 'faker';
import { model } from 'mongoose';

const User = model('User');

export const createUserCredentials = () => ({
  username: faker.internet.userName(),
  password: faker.internet.password(),
});

export const createdUserCredentials = createUserCredentials();

export const setupDataBase = async () => {
  await new User(createdUserCredentials);
};
