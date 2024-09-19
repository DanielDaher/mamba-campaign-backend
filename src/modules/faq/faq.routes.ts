import { Router } from 'express';

import Auth from '@middlewares/auth.middleware';
import Controller from './faq.controller';
import Validator from './faq.validator';

const router = Router();

router
.route('/')
.get(
  Validator.queryParams,
  Controller.findAll,
)
.post(
  Auth.authentication, Auth.roles('admin'),
  Validator.createOne,
  Controller.createOne,
);

router
.route('/:id')
.all(
  Auth.authentication, Auth.roles('admin'),
  Validator.pathParams,
)
.get(
  Controller.findOne,
)
.put(
  Validator.updateOne,
  Controller.updateOne,
)
.delete(
  Controller.deleteOne,
);

export default router;
