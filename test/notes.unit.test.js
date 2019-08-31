import '@babel/polyfill';
import request from 'supertest';
import faker from 'faker';
import { Types } from 'mongoose';
import { article, initDb, emptyDb, user } from './fixtures/db';
import { app } from '../src/server';
import { createToken } from '../src/utils/createToken';

describe('notes routes', () => {
  beforeEach(async () => {
    await emptyDb();
    await initDb();
  });

  const newNote = {
    _id: Types.ObjectId(),
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
});
