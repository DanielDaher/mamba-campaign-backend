
import DataSource from '@database/data-source';

import { Prisma } from '@prisma/client';
import { CampaignDto } from './dtos/campaign.dto';
import { CreateCampaignDto } from './dtos/create-campaign.dto';

class Repository {
  constructor(private readonly repository = DataSource.campaign) {}

  public findAll(size: number, page: number, search?: string) {
    const where: Prisma.CampaignWhereInput = {
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
        select: CampaignDto,
      }),
      this.repository.count({ where }),
    ]);
  }

  public findAllNoPagination(search?: string) {
    const where: Prisma.CampaignWhereInput = {
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
      select: CampaignDto,
    });
  }

  public findOne(id: number) {
    return this.repository.findUnique({
      where: { id },
      select: CampaignDto,
    });
  }

  public createOne(data: CreateCampaignDto) {
    return this.repository.create({
      data,
      select: CampaignDto,
    });
  }

  public updateOne(id: number, data: Prisma.CampaignUpdateInput) {
    return this.repository.update({
      where: { id },
      data,
      select: CampaignDto,
    });
  }

  public deleteOne(id: number) {
    return this.repository.delete({
      where: { id },
      select: CampaignDto,
    });
  }
}

export default new Repository();
