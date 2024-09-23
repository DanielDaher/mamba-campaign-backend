
import { Router } from 'express';

import Auth from '@middlewares/auth.middleware';
import Controller from './register.controller';
import Validator from './register.validator';

const router = Router();

router
.route('/')
.get(
  Auth.authentication,
  Validator.queryParams,
  Controller.findAll,
)
.post(
  Validator.createOne,
  Controller.createOne,
);

router
.route('/:id')
.all(
  Validator.pathParams,
)
.get(
  Controller.findOne,
)
.put(
  Auth.authentication,
  Validator.updateOne,
  Controller.updateOne,
)
.delete(
  Auth.authentication,
  Controller.deleteOne,
);

export default router;
