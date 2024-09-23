
import { Router } from 'express';

import Auth from '@middlewares/auth.middleware';
import Controller from './category.controller';
import Validator from './category.validator';

const router = Router();

router
.route('/')
.all(
  Auth.authentication,
)
.get(
  Validator.queryParams,
  Controller.findAll,
)
.post(
  Auth.roles('admin'),
  Validator.createOne,
  Controller.createOne,
);

router
.route('/:id')
.all(
  Auth.authentication,
  Validator.pathParams,
)
.get(
  Controller.findOne,
)
.patch(
  Auth.roles('admin'),
  Validator.updateOne,
  Controller.updateOne,
)
.delete(
  Auth.roles('admin'),
  Controller.deleteOne,
);

export default router;
