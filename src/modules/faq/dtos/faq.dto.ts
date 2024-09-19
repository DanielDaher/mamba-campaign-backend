import { Prisma } from '@prisma/client';

export const FaqDto = Prisma.validator<Prisma.FaqSelect>()({
  id: true,
  question: true,
  answer: true,
  createdAt: true,
  updatedAt: true,
});
