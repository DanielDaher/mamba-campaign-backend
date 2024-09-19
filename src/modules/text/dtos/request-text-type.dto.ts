import { TextType } from '@prisma/client';
import { z } from 'zod';

export type RequestTextTypeDto = z.output<typeof RequestTextType>;
export const RequestTextType = z.object({
  type: z.nativeEnum(TextType),
});
