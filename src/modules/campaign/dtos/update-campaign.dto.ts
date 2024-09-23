
import { z } from 'zod';
import { CreateCampaign, CreateCampaignFormattedDate } from './create-campaign.dto';

export type UpdateCampaignDto = z.output<typeof UpdateCampaign>;
export const UpdateCampaign = CreateCampaign.partial();

export type UpdateCampaignFormattedDateDto = z.output<typeof UpdateCampaignFormattedDate>;
const UpdateCampaignFormattedDate = CreateCampaignFormattedDate.partial();
