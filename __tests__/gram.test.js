import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Gram from '../lib/models/Gram.js';



describe('demo routes', () => {

  let agent;

  beforeEach(() => {
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
        caption: 'first instagram post',
        tags: 'placecage'
      });
    expect(res.body).toEqual({
      id: '1',
      userId: '1',
      photoUrl: 'https://www.placecage.com/c/200/300',
      caption: 'first instagram post',
      tags: 'placecage'
    });
  });


  it('gets all instagram posts', async () => {
    const gram1 = await Gram.insert({
      photoUrl: 'https://www.placecage.com/c/200/300',
      caption: 'This is my first instagram post',
      tags: 'placecage'
    });
    const gram2 = await Gram.insert({
      photoUrl: 'https://www.placecage.com/c/400/500',
      caption: 'This is my second instagram post',
      tags: 'placecage2'
    });
    const gram3 = await Gram.insert({
      photoUrl: 'https://www.placecage.com/c/500/600',
      caption: 'This is my third instagram post',
      tags: 'placecage3'
    });
    const res = await request(app).get('/api/v1/grams');
    expect(res.body).toEqual([gram1, gram2, gram3]);
  });
  it('updates an instagram post', async () => {
    const grammey = await Gram.insert({
      userId: '1',
      photoUrl: 'https://www.placecage.com/c/200/300',
      caption: 'This is my first instagram post',
      tags: 'placecage'
    });
    const newGrammey = {
      photoUrl: 'https://www.placecage.com/c/200/300',
      caption: 'This is my first instagram post',
      tags: 'newcage!'
    };

    const res = await agent.put(`/api/v1/grams/${grammey.id}`).send(newGrammey);
    console.log(res.body);
    expect(res.body).toEqual({ ...newGrammey, id: '1', userId: '1' });
  });
});

