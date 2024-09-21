
import BaseValidator from '@abstracts/validator.abstract';
import { RequestHandler } from 'express';
import { CreateCampaign } from './dtos/create-campaign.dto';
import { UpdateCampaign } from './dtos/update-campaign.dto';

class Validator extends BaseValidator {
  public createOne: RequestHandler = (req, res, next) => {
    this.validateSchema(req, next, 'body', CreateCampaign);
  };

  public updateOne: RequestHandler = (req, res, next) => {
    this.validateSchema(req, next, 'body', UpdateCampaign);
  };
}

export default new Validator();
