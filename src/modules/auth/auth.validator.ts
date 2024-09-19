import BaseValidator from '@abstracts/validator.abstract';
import { RequestHandler } from 'express';
import { Login } from './dtos/login.dto';
import { ForgotPassword, ResetPassword } from './dtos/password.dto';

class Validator extends BaseValidator {
  public login: RequestHandler = (req, res, next) => {
    this.validateSchema(req, next, 'body', Login);
  };

  public forgotPassword: RequestHandler = (req, res, next) => {
    this.validateSchema(req, next, 'body', ForgotPassword);
  };

  public resetPassword: RequestHandler = (req, res, next) => {
    this.validateSchema(req, next, 'body', ResetPassword);
  };
}

export default new Validator();
