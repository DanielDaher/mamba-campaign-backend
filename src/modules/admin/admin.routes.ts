import { Router } from 'express';
import { Permissions } from '@prisma/client';

import Auth from '@middlewares/auth.middleware';
import Controller from './admin.controller';
import Validator from './admin.validator';

const router = Router();

router
.route('/')
.all(
  Auth.authentication, Auth.roles('admin'), Auth.authorization(Permissions.configuracoes),
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
  Auth.authentication, Auth.roles('admin'), Auth.authorization(Permissions.configuracoes),
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

router
.route('/:id/update-status')
.patch(
  Auth.authentication, Auth.roles('admin'), Auth.authorization(Permissions.configuracoes),
  Validator.pathParams, Validator.updateStatus,
  Controller.updateStatus,
);

export default router;
