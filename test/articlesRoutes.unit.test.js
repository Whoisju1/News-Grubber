/* eslint-disable no-underscore-dangle */
import '@babel/polyfill';
import request from 'supertest';
import { app } from '../src/server';
import { createToken } from '../src/utils/createToken';
import { article, initDb, user, emptyDb } from './fixtures/db/articles';

describe('Article Routes', () => {
  const token = createToken(user);
  beforeEach(async () => {
    await emptyDb();
    await initDb();
  });

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
});
