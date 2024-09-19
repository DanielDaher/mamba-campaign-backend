import Service from './text.service';
import { Request, Response } from 'express';
import { RequestTextTypeDto } from './dtos/request-text-type.dto';

class Controller {
  public async findOne(req: Request, res: Response) {
    const { type } = req.query as RequestTextTypeDto;

    const result = await Service.findOne(type);
    res.status(200).json(result);
  }

  public async updateOne(req: Request, res: Response) {
    const { type } = req.query as RequestTextTypeDto;

    const result = await Service.updateOne(type, req.body);
    res.status(200).json(result);
  }
}

export default new Controller();
