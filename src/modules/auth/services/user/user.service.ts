import Repository from './user.repository';

import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';

import { AccountStatus, User } from '@prisma/client';
import { IPayloadDto } from '../../dtos/payload.dto';
import { LoginDto } from '../../dtos/login.dto';
import { ResetPasswordDto } from '../../dtos/password.dto';

import JwtHelper from '@helpers/token.helper';
import PasswordHelper from '@helpers/password.helper';

class Service {
  public async loginUser(data: LoginDto) {
    // find user.
    const user = await this.findByCredential(data.credential);

    // check if user is active.
    this.checkIfUserIsActive(user);

    // compare password.
    this.comparePasswords(data.password, user.password);

    // generate token and account object.
    const payload: IPayloadDto = {
      id: user.id,
      role: user.role,
      type: user.type,
      name: user.name,
    };

    return {
      token: JwtHelper.createToken(payload),
      account: payload,
    };
  }

  public async resetPasswordUser(data: ResetPasswordDto) {
    // find user.
    const user = await this.findByCredentialAndCode(data.credential, data.code);

    // change password.
    await Repository.changePassword(user.id, PasswordHelper.hash(data.password));
    return { message: 'Senha atualizada com sucesso!' };
  }

  private checkIfUserIsActive(user: User) {
    if (user.status === AccountStatus.inativo) {
      throw new AppException(403, ErrorMessages.INACTIVE);
    }
    if (user.status === AccountStatus.pendente) {
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
    const user = await Repository.findByCredential(credential);

    if (!user) {
      throw new AppException(400, ErrorMessages.INVALID_CREDENTIALS);
    }
    return user;
  }

  private async findByCredentialAndCode(credential: string, code: string) {
    const user = await this.findByCredential(credential);

    if (user.code !== code) {
      throw new AppException(404, ErrorMessages.INCORRECT_CODE_PASS);
    }
    return user;
  }
}

export default new Service();
