import { Prisma } from '@prisma/client';

export const AdminDto = Prisma.validator<Prisma.AdminSelect>()({
  id: true,
  name: true,
  email: true,
  status: true,
  imageUrl: true,
  createdAt: true,
  updatedAt: true,
});

export const AdminWithPermissionsDto = Prisma.validator<Prisma.AdminSelect>()({
  ...AdminDto,
  permissions: true,
});
