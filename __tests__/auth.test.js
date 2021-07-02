import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';


// const agent = request.agent(app);

describe('demo routes', () => {
  beforeAll(() => {
    return setup(pool);
  });

  it('signs up a user via POST', async () => {

    const res = await request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'test@test.com',
        password: 'password',
        profilePhoto: 'BradPitt.com/img22'
      });


    expect(res.body).toEqual({
      id: '1',
      email: 'test@test.com',
      profilePhoto: 'BradPitt.com/img22'
    });
  });

  it('logs in a user via POST', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'test@test.com',
        password: 'password',
        profilePhoto: 'BradPitt.com/img22'
      });
    expect(res.body).toEqual({
      email: 'test@test.com',
      id: '1',
      profilePhoto: 'BradPitt.com/img22'
    });
  });
});
