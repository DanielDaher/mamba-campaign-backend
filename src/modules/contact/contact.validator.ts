import BaseValidator from '@abstracts/validator.abstract';
import { RequestHandler } from 'express';
import { SendContactEmail } from './dtos/send-contact-email.dto';

class Validator extends BaseValidator {
  public sendContactEmail: RequestHandler = (req, res, next) => {
    this.validateSchema(req, next, 'body', SendContactEmail);
  };
}

export default new Validator();
