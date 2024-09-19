import { z } from 'zod';
import { CreateAdmin } from './create-admin.dto';

export type UpdateAdminDto = z.output<typeof UpdateAdmin>;
export const UpdateAdmin = CreateAdmin;
