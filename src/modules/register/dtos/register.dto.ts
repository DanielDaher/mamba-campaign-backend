
import { Prisma } from '@prisma/client';

export const RegisterDto = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  role: true,
  type: true,
  name: true,
  email: true,
  password: false,
  status: true,
  imageUrl: true,
  code: true,
  codeExpiresIn: true,
  createdAt: true,
  updatedAt: true,
  campaigns: {
    select: {
      id: true,
      title: true,
      status: true,
      startDate: true,
      endDate: true,
    },
  },
});
