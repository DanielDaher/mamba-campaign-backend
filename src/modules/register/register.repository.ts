
import DataSource from '@database/data-source';

import { Prisma } from '@prisma/client';
import { RegisterDto } from './dtos/register.dto';

class Repository {
  constructor(private readonly repository = DataSource.user) {}

  public findAll(size: number, page: number, search?: string) {
    const where: Prisma.UserWhereInput = {
      AND: [
        { OR:
          [
            { email: { contains: search } },
            { name: { contains: search } },
          ],
        },
      ],
    };

    return DataSource.$transaction([
      this.repository.findMany({
        where,
        take: size,
        skip: ((page - 1) * size),
        select: RegisterDto,
      }),
      this.repository.count({ where }),
    ]);
  }

  public findAllNoPagination(search?: string) {
    const where: Prisma.UserWhereInput = {
      AND: [
        { OR:
          [
            { email: { contains: search } },
            { name: { contains: search } },
          ],
        },
      ],
    };

    return this.repository.findMany({
      where,
      select: RegisterDto,
    });
  }

  public findOne(id: number) {
    return this.repository.findUnique({
      where: { id },
      select: RegisterDto,
    });
  }

  public createOne(data: Prisma.UserCreateInput) {
    return this.repository.create({
      data,
      select: RegisterDto,
    });
  }

  public updateOne(id: number, data: Prisma.UserUpdateInput) {
    return this.repository.update({
      where: { id },
      data,
      select: RegisterDto,
    });
  }

  public deleteOne(id: number) {
    return this.repository.delete({
      where: { id },
      select: RegisterDto,
    });
  }
}

export default new Repository();
