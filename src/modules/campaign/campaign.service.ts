
import Repository from './campaign.repository';

import moment from 'moment';
import momentTimezone from 'moment-timezone';
import Auth from '@middlewares/auth.middleware';
import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';
import PaginationHelper from '@helpers/pagination.helper';
import categoryService from '@modules/category/category.service';

import { CreateCampaignDto } from './dtos/create-campaign.dto';
import { UpdateCampaignDto } from './dtos/update-campaign.dto';
import { IPayloadDto } from '@modules/auth/dtos/payload.dto';
import { CampaignStatus } from '@prisma/client';

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

    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);
    const createdAt = momentTimezone.utc().tz('America/Sao_Paulo').format();

    this.validateDates(startDate, endDate, createdAt);
    const status = this.setStatus(endDate, data.status, createdAt);

    const formattedData = {
      ...data,
      startDate,
      endDate,
      status,
      createdAt,
    };

    return await Repository.createOne(formattedData);
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

    const createdAt = campaign.createdAt;
    const endDate = new Date (data.endDate || campaign.endDate);
    const startDate = new Date (data.startDate || campaign.startDate);

    this.validateDates(startDate, endDate, createdAt);

    const brasilNow = momentTimezone.utc().tz('America/Sao_Paulo').format();
    const currentStatus = data.status ? data.status : campaign.status;
    const status = this.setStatus(endDate, currentStatus, brasilNow);

    const formattedData = { ...data, startDate, endDate, status };

    return await Repository.updateOne(campaign.id, formattedData);
  }

  public async deleteOne(id: number, currentAuth: IPayloadDto) {
    const campaign = await this.findOne(id);
    Auth.checkCurrentUser(currentAuth, campaign.owner.id);

    if (currentAuth.role === 'admin') return await Repository.deleteOne(campaign.id);

    const status = CampaignStatus.deletada;
    return this.updateOne(id, { status }, currentAuth);
  }

  private validateDates(startDate: Date, endDate: Date, createdAt: string) {

    const createdDate = moment.parseZone(createdAt.slice(0, -6));

    if (!moment(endDate).isAfter(startDate)) {
      throw new AppException(400, ErrorMessages.INVALID_END_START_DATE);
    }

    if (!moment(startDate).isSameOrAfter(createdDate)) {
      throw new AppException(400, ErrorMessages.INVALID_START_DATE);
    }
  }

  private setStatus(endDate: Date, status: CampaignStatus, brasilNow: string) {

    const currentDate = moment.parseZone(brasilNow.slice(0, -6));

    if (moment(endDate).isBefore(currentDate)) {
      const currentStatus = CampaignStatus.expirada;
      return currentStatus;
    }

    return status;
  }

}

export default new Service();
