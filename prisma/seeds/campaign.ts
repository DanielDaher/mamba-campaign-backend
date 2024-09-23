import moment from 'moment-timezone';
const nowInBrazil = moment.tz('America/Sao_Paulo');
import { Prisma, PrismaClient } from '@prisma/client';

const campaign: Prisma.CampaignCreateInput = {
  title: 'Campanha de Inovação',
  status: 'ativa',
  startDate: new Date('2024-10-10'),
  endDate: new Date('2024-12-31'),
  createdAt: nowInBrazil.format(),
  owner: {
    connect: { id: 1 },
  },
  category: {
    connect: { id: 1 },
  },
};

export async function seedCampaign(prisma: PrismaClient): Promise<void> {
  await prisma.campaign.create({
    data: campaign,
  });

  console.log('Campaign seed OK.');
}
