
import Repository from './register.repository';

import Auth from '@middlewares/auth.middleware';
import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';
import PaginationHelper from '@helpers/pagination.helper';

import JwtHelper from '@helpers/token.helper';
import passwordHelper from '@helpers/password.helper';

import { CreateRegisterDto } from './dtos/create-register.dto';
import { UpdateRegisterDto } from './dtos/update-register.dto';
import { IPayloadDto } from '@modules/auth/dtos/payload.dto';
import userRepository from '@modules/auth/services/user/user.repository';

class Service {
  public async findAll(size: number, page: number, search?: string) {
    const registers = await Repository.findAll(size, page, search);

    return PaginationHelper.paginate(registers, size, page);
  }

  public async findAllNoPagination(search?: string) {
    return await Repository.findAllNoPagination(search);
  }

  public async findOne(id: number) {
    const register = await Repository.findOne(id);

    if (!register) {
      throw new AppException(404, ErrorMessages.USER_NOT_FOUND);
    }
    return register;
  }

  public async createOne(data: CreateRegisterDto) {
    await this.findByCredential(data.email);

    const password = passwordHelper.hash(data.password);

    const formattedData = { ...data, password };
    const newUser = await Repository.createOne(formattedData);

    const payload: IPayloadDto = {
      id: newUser.id,
      role: newUser.role,
      type: newUser.type,
      name: newUser.name,
    };

    return {
      token: JwtHelper.createToken(payload),
      ...newUser,
    };
  }

  public async updateOne(id: number, data: UpdateRegisterDto, currentAuth: IPayloadDto) {
    const register = await this.findOne(id);

    Auth.checkCurrentUser(currentAuth, register.id);

    if (data.email) {
      await this.findByCredential(data.email);
    }

    const formattedData = {
      ...data,
      password: data.password ? passwordHelper.hash(data.password) : undefined,
    };

    return await Repository.updateOne(register.id, formattedData);
  }

  public async deleteOne(id: number, currentAuth: IPayloadDto) {
    const register = await this.findOne(id);
    Auth.checkCurrentUser(currentAuth, register.id);

    if (currentAuth.role === 'admin') return await Repository.deleteOne(register.id);

    return Repository.updateOne(register.id, { status: 'inativo' });
  }

  private async findByCredential(credential: string) {
    const user = await userRepository.findByCredential(credential);

    if (user) {
      throw new AppException(400, ErrorMessages.ACCOUNT_ALREADY_EXISTS);
    }
  }
}

export default new Service();
