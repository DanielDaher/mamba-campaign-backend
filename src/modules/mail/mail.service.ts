import Mail from '@libs/nodemailer';

import { IContactEmail } from './dtos/contact-email.dto';
import { IForgotPasswordEmail } from './dtos/forgot-password-email.dto';
import { INewAdminAccountEmail } from './dtos/new-admin-email.dto';

class Service {
  public async sendContactEmail(content: IContactEmail) {
    return await Mail.sendEmail(process.env.SMTP_TO as string, '[[name]] - Alguém entrou em contato!', 'contact', content);
  }

  public async sendForgotPasswordEmail(email: string, content: IForgotPasswordEmail) {
    return await Mail.sendEmail(email, '[[name]] - Esqueceu sua senha?', 'forgot-password', content);
  }

  public async sendNewAdminAccountEmail(email: string, content: INewAdminAccountEmail) {
    return await Mail.sendEmail(email, '[[name]] - Aqui está sua senha de acesso!', 'new-admin-user', content);
  }
}

export default new Service();
