/* eslint-disable no-underscore-dangle */
import '@babel/polyfill';
import request from 'supertest';
import { app } from '../src/server';
import { createToken } from '../src/utils/createToken';
import {
  article,
  initDb,
  user,
  emptyDb,
  createArticleObject,
} from './fixtures/db';

describe('Article Routes', () => {
  const token = createToken(user);
  beforeEach(async () => {
    await emptyDb();
    await initDb();
  });

  // `GET /api/articles/:id`
  describe('`getOneArticle`', () => {
    it('should return one article', async () => {
      const response = await request(app)
        .get(`/api/articles/${article._id}`)
        .set('authorization', `Bearer ${token}`)
        .expect(200);
      const foundArticle = JSON.parse(response.text);
      expect(foundArticle).toEqual(
        expect.objectContaining({ _id: article._id, author: article.author })
      );
    });
  });

  // `POST /api/articles`
  describe('save article route', () => {
    const newArticle = createArticleObject();

    it('should return saved article', async () => {
      const response = await request(app)
        .post('/api/articles')
        .set('authorization', `Bearer ${token}`)
        .send(newArticle)
        .expect(200);
      const parsedRes = JSON.parse(response.text);
      expect(parsedRes).toMatchObject({
        _id: newArticle._id,
        author: newArticle.author,
      });
    });
  });
});