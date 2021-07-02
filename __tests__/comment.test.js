import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Comment from '../lib/models/Comment.js';
import Gram from '../lib/models/Gram.js';


describe('demo routes', () => {

  let agent;
  let user;
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

    const userRes = await agent
      .post('/api/v1/auth/login')
      .send({
        email: 'test@test.com',
        password: 'password'
      });
    user = userRes.body;

  });

  it('creates a comment via POST', async () => {

    const post = await Gram.insert({
      userId: user.id,
      photoUrl: 'https://www.placecage.com/c/200/300',
      caption: 'first instagram post',
      tags: 'placecage'
    });

    const res = await agent
      .post('/api/v1/comments')
      .send({
        comment: 'If the juice was worth the squeeze',
        commentBy: user.id,
        userPost: post.id
      });

    expect(res.body).toEqual({
      id: '1',
      comment: 'If the juice was worth the squeeze',
      commentBy: '1',
      userPost: post.id
    });
  });

  it('deletes a comment made by a user', async () => {
    const post = await Gram.insert({
      userId: user.id,
      photoUrl: 'https://www.placecage.com/c/200/300',
      caption: 'first instagram post',
      tags: 'placecage'
    });

    await agent
      .delete('/api/v1/comments/:id')
      .send({
        comment: 'If the juice was worth the squeeze',
        commentBy: user.id,
        userPost: post.id
      });
  });

});
