
import { z } from 'zod';
import { CreateRegister } from './create-register.dto';

export type UpdateRegisterDto = z.output<typeof UpdateRegister>;
export const UpdateRegister = CreateRegister.partial();
