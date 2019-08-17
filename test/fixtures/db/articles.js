/* eslint-disable no-underscore-dangle */
import { model, Types } from 'mongoose';
import faker from 'faker';
import bcrypt from 'bcrypt';

const User = model('User');
const Article = model('Article');

// create hashed password
export const hashedPass = bcrypt.hashSync('password', 10);

export const createUser = () => ({
  _id: `${Types.ObjectId()}`,
  username: faker.internet.userName(),
  password: hashedPass,
});

export const user = createUser();

const createArticleObject = () => ({
  _id: `${Types.ObjectId()}`,
  url: faker.internet.url(),
  title: faker.lorem.sentence(10),
  subTitle: faker.lorem.sentence(7),
  image: faker.internet.url(),
  author: {
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    authorInfo: faker.internet.url(),
  },
  publicationDate: {
    date: faker.date.past(),
    time: faker.date.past(),
  },
});

export const article = createArticleObject();

// save save user to database
export const saveUserToDb = async () => {
  const newUser = await new User(user).save();
  return newUser;
};

// save article to database and assign it to created user
export const saveArticleToDb = async () => {
  const newArticle = await new Article(article);

  newArticle.user = user._id;
  await newArticle.save();

  return newArticle;
};

export const initDb = async () => {
  await saveUserToDb();
  await saveArticleToDb();
};

export const emptyDb = async () => {
  await User.deleteMany().exec();
  await Article.deleteMany().exec();
};
