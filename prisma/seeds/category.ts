import { Prisma, PrismaClient } from '@prisma/client';

const category: Prisma.CategoryCreateInput = {
  title: 'Tecnologia',
};

export async function seedCategory(prisma: PrismaClient): Promise<void> {
  await prisma.category.create({
    data: category,
  });

  console.log('Category seed OK.');
}
