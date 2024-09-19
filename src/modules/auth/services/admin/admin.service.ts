import Repository from './admin.repository';

import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';

import { AccountStatus, Admin } from '@prisma/client';
import { IPayloadDto } from '../../dtos/payload.dto';
import { LoginDto } from '../../dtos/login.dto';
import { ForgotPasswordDto, ResetPasswordDto } from '../../dtos/password.dto';

import CodeHelper from '@helpers/code.helper';
import JwtHelper from '@helpers/token.helper';
import PasswordHelper from '@helpers/password.helper';
import MailService from '../../../mail/mail.service';

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

  public async forgotPasswordAdm(data: ForgotPasswordDto) {
    // find admin.
    const admin = await this.findByCredential(data.credential);

    // generate and store code.
    const { code, minutes } = await this.storeCode(admin.id);

    // send an email with code.
    await MailService.sendForgotPasswordEmail(admin.email, { code, minutes });
    return { message: 'Código de recuperação de senha enviado no seu email!' };
  }

  public async resetPasswordAdm(data: ResetPasswordDto) {
    // find admin.
    const admin = await this.findByCredentialAndCode(data.credential, data.code);

    // check code validation.
    this.checkCodeValidation(admin.codeExpiresIn as Date);

    // change password.
    await Repository.changePassword(admin.id, PasswordHelper.hash(data.password));
    return { message: 'Senha atualizada com sucesso!' };
  }


  private checkCodeValidation(codeExpiresIn: Date) {
    const isExpired = CodeHelper.isExpired(codeExpiresIn);
    if (isExpired) {
      throw new AppException(400, ErrorMessages.CODE_EXPIRED);
    }
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

  private async findByCredentialAndCode(credential: string, code: string) {
    const admin = await this.findByCredential(credential);

    if (admin.code !== code) {
      throw new AppException(404, ErrorMessages.INCORRECT_CODE_PASS);
    }
    return admin;
  }

  private async storeCode(id: number) {
    const minutes = 15;
    const { code, codeExpiresIn } = CodeHelper.generate(minutes);

    await Repository.storeCode(id, code, codeExpiresIn);

    return { code, minutes };
  }
}

export default new Service();
