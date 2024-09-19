import { z } from 'zod';
import { AccountStatus } from '@prisma/client';

export type UpdateStatusDto = z.output<typeof UpdateStatus>;
export const UpdateStatus = z.object({
  status: z.enum([AccountStatus.ativo, AccountStatus.inativo]),
});
