import Service from './admin.service';
import { Request, Response } from 'express';
import { RequestQueryDto } from '@dtos/request-query.dto';

class Controller {
  public async findAll(req: Request, res: Response) {
    const { size, page, status, search } = req.query as RequestQueryDto;

    const result = (size && page)
      ? await Service.findAll(size, page, status, search)
      : await Service.findAllNoPagination(status, search);
    res.status(200).json(result);
  }

  public async findOne(req: Request, res: Response) {
    const result = await Service.findOne(+req.params.id);
    res.status(200).json(result);
  }

  public async createOne(req: Request, res: Response) {
    const result = await Service.createOne(req.body);
    res.status(201).json(result);
  }

  public async updateOne(req: Request, res: Response) {
    const result = await Service.updateOne(+req.params.id, req.body);
    res.status(200).json(result);
  }

  public async deleteOne(req: Request, res: Response) {
    const result = await Service.deleteOne(+req.params.id);
    res.status(200).json(result);
  }

  public async updateStatus(req: Request, res: Response) {
    const result = await Service.updateStatus(+req.params.id, req.body.status);
    res.status(200).json(result);
  }
}

export default new Controller();
