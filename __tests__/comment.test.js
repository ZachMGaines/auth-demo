import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Comment from '../lib/models/Comment.js';
import Gram from '../lib/models/Gram.js';


describe('demo routes', () => {

  let agent;
  let user;
  let post;

  const post1 = {
    photoUrl: 'cat.png',
    caption: 'my cat',
    tags: ['#cute', '#cat']
  };


  beforeEach(() => {
    return setup(pool);
  });

  beforeEach(async () => {
    agent = request.agent(app);
    await agent
      .post('/api/v1/auth/signup')
      .send({
        email: 'test@test.com',
        password: 'password',
        profilePhoto: 'BradPitt.com/img22'
      });

    const userRes = await agent
      .post('/api/v1/auth/login')
      .send({
        email: 'test@test.com',
        password: 'password',
        profilePhoto: 'BradPitt.com/img22'
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
    const post = await Gram.insert({ ...post1, userId: user.id });
    const comment = await Comment.insert({
      id: '1',
      comment: 'If the juice was worth the squeeze',
      commentBy: user.id,
      userPost: post.id
    });
    const res = await agent
      .delete(`/api/v1/comments/${comment.id}`)
      .send(comment);

    expect(res.body).toEqual(comment);
  });

});
