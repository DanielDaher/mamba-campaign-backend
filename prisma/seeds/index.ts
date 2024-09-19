import { PrismaClient } from '@prisma/client';
import { seedAdmin } from './admin';
import { seedUser } from './user';
import { seedCategory } from './category';
import { seedCampaign } from './campaign';

const prisma = new PrismaClient();
async function main() {
  await seedAdmin(prisma);
  await seedUser(prisma);
  await seedCategory(prisma);
  seedCampaign(prisma);
}

main()
.catch((e) => {
  console.error(e);
  process.exit(1);
})
.finally(async() => {
  await prisma.$disconnect();
});
