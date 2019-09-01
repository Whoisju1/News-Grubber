import '@babel/polyfill';
import request from 'supertest';
import faker from 'faker';
import { models } from 'mongoose';
import { article, initDb, emptyDb, user } from './fixtures/db';
import { app } from '../src/server';
import { createToken } from '../src/utils/createToken';

describe('notes routes', () => {
  beforeEach(async () => {
    await emptyDb();
    await initDb();
  });

  const newNote = {
    body: faker.lorem.paragraph(3),
  };
  const token = createToken(user);

  describe('Route for adding a note', () => {
    it('should return the added note', async () => {
      const raw = await request(app)
        .post(`/api/notes/${article._id}`)
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send({ note: newNote })
        .expect(200);

      const res = JSON.parse(raw.text);
      expect(res).toHaveProperty('_id');
      expect(res.body).toBe(newNote.body);
    });
  });

  describe('Route for editing a note', () => {
    it('should return the edited note', async () => {
      const rawNote = await request(app)
        .post(`/api/notes/${article._id}`)
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send({ note: newNote })
        .expect(200);

      const savedNote = JSON.parse(rawNote.text);

      const raw = await request(app)
        .put(`/api/notes/${savedNote._id}?article_id=${article._id}`)
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send({ note: { body: 'This note is edited' } })
        .expect(200);

      const res = JSON.parse(raw.text);
      expect(res.body).toBe('This note is edited');
      expect(res._id).toBe(savedNote._id);
    });
  });

  // DELETE /api/notes/:id
  describe('Route for deleting a note', () => {
    it('should return the deleted note', async () => {
      const foundArticle = await models.Article.findById(article._id);
      const noteToDelete = { body: 'Note to delete' };
      await foundArticle.notes.push(noteToDelete);
      const savedArticle = await foundArticle.save();
      const savedNote = savedArticle.notes[0];

      expect(savedNote.body).toBe(noteToDelete.body);

      const raw = await request(app)
        .delete(`/api/notes/${savedNote._id}?article_id=${article._id}`)
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .expect(200);

      const res = JSON.parse(raw.text);

      expect(res._id).toBe(savedNote._id.toString());
      expect(res.body).toBe(savedNote.body.toString());
    });
  });
});
