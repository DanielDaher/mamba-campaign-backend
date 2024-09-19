import DataSource from '@database/data-source';

import { Prisma } from '@prisma/client';
import { FaqDto } from './dtos/faq.dto';

class Repository {
  constructor(private readonly repository = DataSource.faq) {}

  public findAll(size: number, page: number, search?: string) {
    const where: Prisma.FaqWhereInput = {
      AND: [
        { OR:
          [
            { question: { contains: search } },
            { answer: { contains: search } },
          ],
        },
      ],
    };

    return DataSource.$transaction([
      this.repository.findMany({
        where,
        take: size,
        skip: ((page - 1) * size),
        select: FaqDto,
        orderBy: { createdAt: 'desc' },
      }),
      this.repository.count({ where }),
    ]);
  }

  public findAllNoPagination(search?: string) {
    const where: Prisma.FaqWhereInput = {
      AND: [
        { OR:
          [
            { question: { contains: search } },
            { answer: { contains: search } },
          ],
        },
      ],
    };

    return this.repository.findMany({
      where,
      select: FaqDto,
      orderBy: { createdAt: 'desc' },
    });
  }

  public findOne(id: number) {
    return this.repository.findUnique({
      where: { id },
      select: FaqDto,
    });
  }

  public createOne(data: Prisma.FaqCreateInput) {
    return this.repository.create({
      data,
      select: FaqDto,
    });
  }

  public updateOne(id: number, data: Prisma.FaqUpdateInput) {
    return this.repository.update({
      where: { id },
      data,
      select: FaqDto,
    });
  }

  public deleteOne(id: number) {
    return this.repository.delete({
      where: { id },
      select: FaqDto,
    });
  }
}

export default new Repository();
