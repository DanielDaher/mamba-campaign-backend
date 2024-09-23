
import DataSource from '@database/data-source';

import { CampaignStatus, Prisma } from '@prisma/client';
import { CampaignDto } from './dtos/campaign.dto';
import { CreateCampaignFormattedDateDto } from './dtos/create-campaign.dto';
import { UpdateCampaignFormattedDateDto } from './dtos/update-campaign.dto';

class Repository {
  constructor(private readonly repository = DataSource.campaign) {}

  public findAll(size: number, page: number, search?: string) {
    const where: Prisma.CampaignWhereInput = {
      status: { not: CampaignStatus.deletada },
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
      status: { not: CampaignStatus.deletada },
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

  public async createOne(data: CreateCampaignFormattedDateDto) {
    const { ownerId, categoryId, ...restData } = data;
    // return data.createdAt;

    return await DataSource.$transaction( async( trx ) => {

      return await trx.campaign.create({
        select: CampaignDto,
        data: {
          ...restData,
          createdAt: data.createdAt,
          owner: { connect: { id: ownerId } },
          category: { connect: { id: categoryId } },
        },
      });

    });

  }

  public async updateOne(id: number, data: UpdateCampaignFormattedDateDto) {
    const { ownerId, categoryId, ...restData } = data;

    return await DataSource.$transaction( async( trx ) => {

      return await trx.campaign.update({
        where: { id },
        select: CampaignDto,
        data: {
          ...restData,
          owner: ownerId ? { connect: { id: ownerId } } : undefined,
          category: categoryId ? { connect: { id: categoryId } } : undefined,
        },
      });
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
