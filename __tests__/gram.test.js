import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';


const agent = request.agent(app);

describe.skip('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });


  it.skip('creates an instagram post', async () => {
    const res = await agent
      .post('/api/v1/grams')
      .send({
        photoUrl: 'https://www.placecage.com/c/200/300',
        caption: 'This is my first instagram post',
        tags: 'placecage'
      });
    expect(res.body).toEqual({
      id: 1,
      userName: 'ZG',
      photoUrl: 'https://www.placecage.com/c/200/300',
      caption: 'This is my first instagram post',
      tags: 'placecage'
    });
  });
});
