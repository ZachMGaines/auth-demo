import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';




describe('demo routes', () => {
  let agent;
  beforeAll(() => {
    return setup(pool);
  });
  beforeEach(async () => {

    agent = request.agent(app);

    await agent
      .post('/api/v1/auth/signup')
      .send({
        email: 'test@test.com',
        password: 'password'
      });

    await agent
      .post('/api/v1/auth/login')
      .send({
        email: 'test@test.com',
        password: 'password'
      });
  });


  it('creates an instagram post', async () => {
    const res = await agent
      .post('/api/v1/grams')
      .send({
        photoUrl: 'https://www.placecage.com/c/200/300',
        caption: 'This is my first instagram post',
        tags: 'placecage'
      });
    expect(res.body).toEqual({
      id: '1',
      userId: '1',
      photoUrl: 'https://www.placecage.com/c/200/300',
      caption: 'This is my first instagram post',
      tags: 'placecage'
    });
  });
});
