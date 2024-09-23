import Repository from './admin.repository';

import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';

import { AccountStatus, Admin } from '@prisma/client';
import { IPayloadDto } from '../../dtos/payload.dto';
import { LoginDto } from '../../dtos/login.dto';

import JwtHelper from '@helpers/token.helper';
import PasswordHelper from '@helpers/password.helper';

class Service {
  public async findAllPermissions(id: number) {
    return await Repository.findAllPermissions(id);
  }

  public async loginAdm(data: LoginDto) {
    // find admin.
    const admin = await this.findByCredential(data.credential);

    // check if admin is active.
    this.checkIfAdminIsActive(admin);

    // compare password.
    this.comparePasswords(data.password, admin.password);

    // generate token and account object.
    const payload: IPayloadDto = {
      id: admin.id,
      role: admin.role,
      name: admin.name,
    };

    return {
      token: JwtHelper.createToken(payload),
      account: payload,
    };
  }

  private checkIfAdminIsActive(admin: Admin) {
    if (admin.status === AccountStatus.inativo) {
      throw new AppException(403, ErrorMessages.INACTIVE);
    }
    if (admin.status === AccountStatus.pendente) {
      throw new AppException(403, ErrorMessages.PENDING);
    }
  }

  private comparePasswords(password: string, hash: string) {
    const isMatch = PasswordHelper.comparePasswordAndHash(password, hash);
    if (!isMatch) {
      throw new AppException(400, ErrorMessages.INVALID_CREDENTIALS);
    }
  }

  private async findByCredential(credential: string) {
    const admin = await Repository.findByCredential(credential);

    if (!admin) {
      throw new AppException(400, ErrorMessages.INVALID_CREDENTIALS);
    }
    return admin;
  }
}

export default new Service();
