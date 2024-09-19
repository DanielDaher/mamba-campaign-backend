import { Router } from 'express';
import { Permissions } from '@prisma/client';

import Auth from '@middlewares/auth.middleware';
import Controller from './admin-permission.controller';

const router = Router();

router
.route('/')
.get(
  Auth.authentication, Auth.roles('admin'), Auth.authorization(Permissions.configuracoes),
  Controller.findAll,
);

export default router;
