
import DataSource from '@database/data-source';

import { Prisma } from '@prisma/client';
import { CategoryDto } from './dtos/category.dto';

class Repository {
  constructor(private readonly repository = DataSource.category) {}

  public findAll(size: number, page: number, search?: string) {
    const where: Prisma.CategoryWhereInput = {
      AND: [
        { OR:
          [
            { title: { contains: search } },
          ],
        },
      ],
    };

    return DataSource.$transaction([
      this.repository.findMany({
        where,
        take: size,
        skip: ((page - 1) * size),
        select: CategoryDto,
      }),
      this.repository.count({ where }),
    ]);
  }

  public findAllNoPagination(search?: string) {
    const where: Prisma.CategoryWhereInput = {
      AND: [
        { OR:
          [
            { title: { contains: search } },
          ],
        },
      ],
    };

    return this.repository.findMany({
      where,
      select: CategoryDto,
    });
  }

  public findOne(id: number) {
    return this.repository.findUnique({
      where: { id },
      select: CategoryDto,
    });
  }

  public createOne(data: Prisma.CategoryCreateInput) {
    return this.repository.create({
      data,
      select: CategoryDto,
    });
  }

  public updateOne(id: number, data: Prisma.CategoryUpdateInput) {
    return this.repository.update({
      where: { id },
      data,
      select: CategoryDto,
    });
  }

  public deleteOne(id: number) {
    return this.repository.delete({
      where: { id },
      select: CategoryDto,
    });
  }
}

export default new Repository();
