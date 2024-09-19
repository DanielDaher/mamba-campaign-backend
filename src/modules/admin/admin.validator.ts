import BaseValidator from '@abstracts/validator.abstract';
import { RequestHandler } from 'express';
import { CreateAdmin } from './dtos/create-admin.dto';
import { UpdateAdmin } from './dtos/update-admin.dto';

class Validator extends BaseValidator {
  public createOne: RequestHandler = (req, res, next) => {
    this.validateSchema(req, next, 'body', CreateAdmin);
  };

  public updateOne: RequestHandler = (req, res, next) => {
    this.validateSchema(req, next, 'body', UpdateAdmin);
  };
}

export default new Validator();
