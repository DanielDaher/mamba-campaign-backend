
import Repository from './campaign.repository';

import Auth from '@middlewares/auth.middleware';
import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';
import PaginationHelper from '@helpers/pagination.helper';

import { CreateCampaignDto } from './dtos/create-campaign.dto';
import { UpdateCampaignDto } from './dtos/update-campaign.dto';
import categoryService from '@modules/category/category.service';
import { IPayloadDto } from '@modules/auth/dtos/payload.dto';

class Service {
  public async findAll(size: number, page: number, search?: string) {
    const campaigns = await Repository.findAll(size, page, search);

    return PaginationHelper.paginate(campaigns, size, page);
  }

  public async findAllNoPagination(search?: string) {
    return await Repository.findAllNoPagination(search);
  }

  public async findOne(id: number) {
    const campaign = await Repository.findOne(id);

    if (!campaign) {
      throw new AppException(404, ErrorMessages.CAMPAIGN_NOT_FOUND);
    }
    return campaign;
  }

  public async createOne(data: CreateCampaignDto, currentAuth: IPayloadDto) {
    await categoryService.findOne(data.categoryId);
    Auth.checkCurrentUser(currentAuth, data.ownerId);

    return await Repository.createOne(data);
  }

  public async updateOne(id: number, data: UpdateCampaignDto, currentAuth: IPayloadDto) {
    const campaign = await this.findOne(id);
    Auth.checkCurrentUser(currentAuth, campaign.owner.id);

    if (data.ownerId) {
      Auth.checkCurrentUser(currentAuth, data.ownerId);
    }

    if (data.categoryId) {
      await categoryService.findOne(data.categoryId);
    }

    return await Repository.updateOne(campaign.id, data);
  }

  public async deleteOne(id: number, currentAuth: IPayloadDto) {
    const campaign = await this.findOne(id);
    Auth.checkCurrentUser(currentAuth, campaign.owner.id);


    return await Repository.deleteOne(campaign.id);
  }
}

export default new Service();
