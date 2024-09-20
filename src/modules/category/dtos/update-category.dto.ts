
import { z } from 'zod';
import { CreateCategory } from './create-category.dto';

export type UpdateCategoryDto = z.output<typeof UpdateCategory>;
export const UpdateCategory = CreateCategory.partial();
