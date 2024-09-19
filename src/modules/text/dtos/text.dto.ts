import { Prisma } from '@prisma/client';

export const TextDto = Prisma.validator<Prisma.TextSelect>()({
  id: true,
  type: true,
  content: true,
  createdAt: true,
  updatedAt: true,
});
