import { Router } from 'express';

import Controller from './auth.controller';
import Validator from './auth.validator';

const router = Router();

// admin routes.
router
.route('/login/adm')
.post(
  Validator.login,
  Controller.loginAdm,
);

// user routes.
router
.route('/login')
.post(
  Validator.login,
  Controller.loginUser,
);

export default router;
