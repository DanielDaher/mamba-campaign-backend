import Repository from './admin-permission.repository';

import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';

class Service {
  public async findAll() {
    return await Repository.findAll();
  }

  public async findById(id: number) {
    const permission = await Repository.findById(id);

    if (!permission) {
      throw new AppException(404, ErrorMessages.PERMISSION_NOT_FOUND);
    }
    return permission;
  }

  public async checkIfPermissionsExists(objectIds: Array<{ id: number }>) {
    const ids = objectIds.map(obj => obj.id); // { id: number }[] => number[]

    await Promise.all(
      ids.map(async(id) => await this.findById(id)),
    );
  }
}

export default new Service();
