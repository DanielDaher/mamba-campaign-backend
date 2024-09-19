import AdminService from './services/admin/admin.service';
import UserService from './services/user/user.service';
import { Request, Response } from 'express';

class Controller {
  public async loginAdm(req: Request, res: Response) {
    const result = await AdminService.loginAdm(req.body);
    res.status(200).json(result);
  }

  public async loginUser(req: Request, res: Response) {
    const result = await UserService.loginUser(req.body);
    res.status(200).json(result);
  }
}

export default new Controller();
