import BaseValidator from '@abstracts/validator.abstract';
import { RequestHandler } from 'express';
import { CreateFaq } from './dtos/create-faq.dto';
import { UpdateFaq } from './dtos/update-faq.dto';

class Validator extends BaseValidator {
  public createOne: RequestHandler = (req, res, next) => {
    this.validateSchema(req, next, 'body', CreateFaq);
  };

  public updateOne: RequestHandler = (req, res, next) => {
    this.validateSchema(req, next, 'body', UpdateFaq);
  };
}

export default new Validator();
