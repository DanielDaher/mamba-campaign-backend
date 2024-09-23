
import { Prisma } from '@prisma/client';

export const CategoryDto = Prisma.validator<Prisma.CategorySelect>()({
  id: true,
  title: true,
  createdAt: true,
  updatedAt: true,
  campaigns: true,
});
