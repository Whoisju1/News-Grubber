/* eslint-disable no-underscore-dangle */
import '@babel/polyfill';
import request from 'supertest';
import faker from 'faker';
import { model } from 'mongoose';
import { app } from '../src/server';
import { createToken } from '../src/utils/createToken';
import {
  article,
  initDb,
  user,
  emptyDb,
  createArticleObject,
} from './fixtures/db';

const Article = model('Article');

describe('Article Routes', () => {
  const token = createToken(user);
  const newArticle = createArticleObject();
  beforeEach(async () => {
    await emptyDb();
    await initDb();
  });

  // `GET /api/articles/:id`
  describe('`getOneArticle`', () => {
    let response;
    beforeEach(async () => {
      const raw = await request(app)
        .get(`/api/articles/${article._id}`)
        .set('authorization', `Bearer ${token}`)
        .expect(200);

      response = JSON.parse(raw.text);
    });

    it('should return one article', async () => {
      expect(response).toEqual(
        expect.objectContaining({ _id: article._id, author: article.author })
      );
    });

    it('should not include a notes property', async () => {
      expect(response).not.toHaveProperty('notes');
    });
  });

  // `POST /api/articles`
  describe('save article route', () => {
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

  // GET /api/articles/
  describe('Getting saved articles', () => {
    let response;
    beforeEach(async () => {
      const raw = await request(app)
        .get('/api/articles')
        .set('authorization', `Bearer ${token}`)
        .expect(200);

      response = JSON.parse(raw.text);
    });

    it('should return saved articles', async () => {
      expect(response).toBeArrayOfSize(1);
      expect(response).toMatchObject([
        {
          _id: article._id,
          url: article.url,
          title: article.title,
        },
      ]);
    });

    it('should not include notes property', async () => {
      expect(response).not.toHaveProperty('notes');
    });
  });

  // DELETE /api/articles/:id
  describe('Delete article', () => {
    it('should delete the article for the id passed in', async () => {
      const res = await request(app)
        .delete(`/api/articles/${article._id}`)
        .set('authorization', `Bearer ${token}`)
        .expect(200);
      const parsedResponse = JSON.parse(res.text);
      expect(parsedResponse._id).toBe(article._id);
    });
  });

  // GET api/articles/:id/notes
  describe('Route for getting article notes', () => {
    it('should return notes for article of specified id', async () => {
      const foundArticle = await Article.findById(article._id);
      const noteToFetch1 = { body: faker.lorem.sentences(3) };
      const noteToFetch2 = { body: faker.lorem.sentences(3) };
      await foundArticle.notes.push(noteToFetch1);
      await foundArticle.notes.push(noteToFetch2);
      const savedArticle = await foundArticle.save();
      const savedNotes = savedArticle.notes;

      const raw = await request(app)
        .get(`/api/articles/${article._id}/notes`)
        .set('authorization', `Bearer ${token}`)
        .expect(200);

      const res = JSON.parse(raw.text);

      const expected = savedNotes.map(note => JSON.parse(JSON.stringify(note)));

      expect(res).toMatchObject(JSON.parse(JSON.stringify(expected)));
    });
  });
});
