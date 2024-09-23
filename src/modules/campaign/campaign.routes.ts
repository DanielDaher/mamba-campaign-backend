
import { Router } from 'express';

import Auth from '@middlewares/auth.middleware';
import Controller from './campaign.controller';
import Validator from './campaign.validator';

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
  Validator.updateOne,
  Controller.updateOne,
)
.delete(
  Controller.deleteOne,
);

export default router;
