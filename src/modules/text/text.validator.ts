import BaseValidator from '@abstracts/validator.abstract';
import { RequestHandler } from 'express';
import { RequestTextType } from './dtos/request-text-type.dto';
import { UpdateText } from './dtos/update-text.dto';

class Validator extends BaseValidator {
  public updateOne: RequestHandler = (req, res, next) => {
    this.validateSchema(req, next, 'body', UpdateText);
  };

  public queryParams: RequestHandler = (req, res, next) => {
    this.validateSchema(req, next, 'query', RequestTextType);
  };
}

export default new Validator();
