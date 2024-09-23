import { z } from 'zod';

export type CreateCategoryDto = z.output<typeof CreateCategory>;
export const CreateCategory = z.object({
  title: z.string().min(1),
});
