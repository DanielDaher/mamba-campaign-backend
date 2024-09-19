import { PrismaClient } from '@prisma/client';
import { seedAdmin } from './admin';
import { seedUser } from './user';
import { seedTexts } from './text';

const prisma = new PrismaClient();
async function main() {
  await seedAdmin(prisma);
  await seedUser(prisma);
  await seedTexts(prisma);
}

main()
.catch((e) => {
  console.error(e);
  process.exit(1);
})
.finally(async() => {
  await prisma.$disconnect();
});
