import { PrismaClient } from '@prisma/client';
import { seedAdmin } from './admin';
import { seedUser } from './user';
import { seedCategory } from './category';
import { seedCampaign } from './campaign';

const prisma = new PrismaClient();
async function main() {
  const admins = await prisma.admin.count();
  const users = await prisma.user.count();
  const categories = await prisma.category.count();
  const campaign = await prisma.campaign.count();

  if ( admins === 0 ) {
    await seedAdmin(prisma);
  }

  if ( users === 0 ) {
    await seedUser(prisma);
  }

  if ( categories === 0 ) {
    await seedCategory(prisma);
  }

  if ( campaign === 0 ) {
    await seedCampaign(prisma);
  }
}

main()
.catch((e) => {
  console.error(e);
  process.exit(1);
})
.finally(async() => {
  await prisma.$disconnect();
});
