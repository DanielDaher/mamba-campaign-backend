import Repository from './faq.repository';

import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';
import PaginationHelper from '@helpers/pagination.helper';

import { CreateFaqDto } from './dtos/create-faq.dto';
import { UpdateFaqDto } from './dtos/update-faq.dto';

class Service {
  public async findAll(size: number, page: number, search?: string) {
    const faqs = await Repository.findAll(size, page, search);

    return PaginationHelper.paginate(faqs, size, page);
  }

  public async findAllNoPagination(search?: string) {
    return await Repository.findAllNoPagination(search);
  }

  public async findOne(id: number) {
    const faq = await Repository.findOne(id);

    if (!faq) {
      throw new AppException(404, ErrorMessages.FAQ_NOT_FOUND);
    }
    return faq;
  }

  public async createOne(data: CreateFaqDto) {
    return await Repository.createOne(data);
  }

  public async updateOne(id: number, data: UpdateFaqDto) {
    const faq = await this.findOne(id);

    return await Repository.updateOne(faq.id, data);
  }

  public async deleteOne(id: number) {
    const faq = await this.findOne(id);

    return await Repository.deleteOne(faq.id);
  }
}

export default new Service();
