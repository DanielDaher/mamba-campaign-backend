import DataSource from '@database/data-source';

import { Prisma, TextType } from '@prisma/client';
import { TextDto } from './dtos/text.dto';

class Repository {
  constructor(private readonly repository = DataSource.text) {}

  public findOne(type: TextType) {
    return this.repository.findUnique({
      where: { type },
      select: TextDto,
    });
  }

  public updateOne(id: number, data: Prisma.TextUpdateInput) {
    return this.repository.update({
      where: { id },
      data,
      select: TextDto,
    });
  }
}

export default new Repository();
