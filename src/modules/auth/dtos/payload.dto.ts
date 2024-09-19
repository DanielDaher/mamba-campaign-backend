import { AccountRole, UserType } from '@prisma/client';

export interface IPayloadDto {
  id: number;
  role: AccountRole;
  type?: UserType;
  name: string;
}
