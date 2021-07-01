import { Router } from 'express';
import ensureAuth from '../middleware/ensure-auth.js';
import Gram from '../models/Gram';


export default Router()
  .post('/api/v1/grams', ensureAuth, (req, res, next) => {
    Gram.insert({ ...req.body, userId: req.user.id })
      .then(gram => res.send(gram))
      .catch(next);
  })

  .get('/api/v1/grams', (req, res, next) => {
    Gram.findAll({ ...req.body })
      .then(gram => res.send(gram))
      .catch(next);
  })

  .put('/api/v1/grams/:id', ensureAuth, (req, res, next) => {

    Gram.update(req.params.id, { ...req.body, userId: req.user.id })
      .then(gram => res.send(gram))
      .catch(next);
  });
