import { PrismaClient, TextType } from '@prisma/client';

export async function seedTexts(prisma: PrismaClient) {
  for (const text of Object.values(TextType)) {
    await prisma.text.create({
      data: {
        type: text,
        content: `${text} vindo da API. Rota integrada.`,
      },
    });
  }

  console.log('Texts seed OK.');
}
