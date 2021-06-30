import { Router } from 'express';
import ensureAuth from '../middleware/ensure-auth';
import Gram from '../models/Gram';


export default Router()
  .post('/api/v1/tweets', ensureAuth, (req, res, next) => {
    Gram.insert({ ...req.body, userId: req.user.id })
      .then(gram => res.send())
      .catch(next);
  });
