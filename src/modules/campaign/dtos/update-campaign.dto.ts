
import { z } from 'zod';
import { CreateCampaign } from './create-campaign.dto';

export type UpdateCampaignDto = z.output<typeof UpdateCampaign>;
export const UpdateCampaign = CreateCampaign.partial();
