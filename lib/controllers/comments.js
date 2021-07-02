import { Router } from 'express';
import ensureAuth from '../middleware/ensure-auth.js';
import Comment from '../models/Comment';


export default Router()
  .post('/api/v1/comments', ensureAuth, (req, res, next) => {

    Comment.insert({ ...req.body, userId: req.user.id })

      .then(comment => res.send(comment))
      .catch(next);
  });
