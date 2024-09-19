import Repository from './user.repository';

import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';

import { AccountStatus, User } from '@prisma/client';
import { IPayloadDto } from '../../dtos/payload.dto';
import { LoginDto } from '../../dtos/login.dto';
import { ForgotPasswordDto, ResetPasswordDto } from '../../dtos/password.dto';

import CodeHelper from '@helpers/code.helper';
import JwtHelper from '@helpers/token.helper';
import PasswordHelper from '@helpers/password.helper';
import MailService from '../../../mail/mail.service';

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

  public async forgotPasswordUser(data: ForgotPasswordDto) {
    // find user.
    const user = await this.findByCredential(data.credential);

    // generate and store code.
    const { code, minutes } = await this.storeCode(user.id);

    // send an email with code.
    await MailService.sendForgotPasswordEmail(user.email, { code, minutes });
    return { message: 'Código de recuperação de senha enviado no seu email!' };
  }

  public async resetPasswordUser(data: ResetPasswordDto) {
    // find user.
    const user = await this.findByCredentialAndCode(data.credential, data.code);

    // check code validation.
    this.checkCodeValidation(user.codeExpiresIn as Date);

    // change password.
    await Repository.changePassword(user.id, PasswordHelper.hash(data.password));
    return { message: 'Senha atualizada com sucesso!' };
  }


  private checkCodeValidation(codeExpiresIn: Date) {
    const isExpired = CodeHelper.isExpired(codeExpiresIn);
    if (isExpired) {
      throw new AppException(400, ErrorMessages.CODE_EXPIRED);
    }
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

  private async storeCode(id: number) {
    const minutes = 15;
    const { code, codeExpiresIn } = CodeHelper.generate(minutes);

    await Repository.storeCode(id, code, codeExpiresIn);

    return { code, minutes };
  }
}

export default new Service();
