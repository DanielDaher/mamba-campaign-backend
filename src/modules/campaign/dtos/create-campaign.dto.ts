import { CampaignStatus } from '@prisma/client';
import { z } from 'zod';

export type CreateCampaignDto = z.output<typeof CreateCampaign>;
export const CreateCampaign = z.object({
  title: z.string().min(1),
  status: z.nativeEnum(CampaignStatus).default(CampaignStatus.ativa),
  startDate: z.string(),
  endDate: z.string(),
  categoryId: z.number(),
  ownerId: z.number(),
});
