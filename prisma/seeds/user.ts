import { Prisma, PrismaClient, AccountRole, AccountStatus, UserType } from '@prisma/client';
import PasswordHelper from '../../src/utils/helpers/password.helper';

const user: Prisma.UserCreateInput = {
  role: AccountRole.user,
  type: UserType.web,
  name: 'User 01',
  email: 'user@getnada.com',
  password: PasswordHelper.hash('123456789'),
  status: AccountStatus.ativo,
};

export async function seedUser(prisma: PrismaClient): Promise<void> {
  await prisma.user.create({
    data: user,
  });

  console.log('Web user seed OK.');
}
