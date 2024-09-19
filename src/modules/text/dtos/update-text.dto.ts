import { z } from 'zod';

export type UpdateTextDto = z.output<typeof UpdateText>;
export const UpdateText = z.object({
  content: z.string().trim().min(1),
});
