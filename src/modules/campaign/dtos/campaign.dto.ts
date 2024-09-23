
import { Prisma } from '@prisma/client';

export const CampaignDto = Prisma.validator<Prisma.CampaignSelect>()({
  id: true,
  title: true,
  status: true,
  startDate: true,
  endDate: true,
  createdAt: true,
  updatedAt: true,
  owner: {
    select: {
      id: true,
      imageUrl: true,
      name: true,
      email: true,
    },
  },
  category: {
    select: {
      id: true,
      title: true,
    },
  },
});
