
import { AccountStatus, UserType } from '@prisma/client';
import { z } from 'zod';

export type CreateRegisterDto = z.output<typeof CreateRegister>;
export const CreateRegister = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(4),
  imageUrl: z.string(),
  type: z.nativeEnum(UserType).default(UserType.web),
  status: z.nativeEnum(AccountStatus).default(AccountStatus.ativo),
});
