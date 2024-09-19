import { z } from 'zod';
import { AccountStatus } from '@prisma/client';

export type RequestQueryDto = z.output<typeof RequestQuery>;
export const RequestQuery = z.object({
  page: z.coerce.number().positive().int().optional(),
  size: z.coerce.number().positive().int().optional(),
  search: z.string().optional(),
  status: z.nativeEnum(AccountStatus).optional(),
});
