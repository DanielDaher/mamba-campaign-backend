
import Repository from './category.repository';

import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';
import PaginationHelper from '@helpers/pagination.helper';

import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';

class Service {
  public async findAll(size: number, page: number, search?: string) {
    const categorys = await Repository.findAll(size, page, search);

    return PaginationHelper.paginate(categorys, size, page);
  }

  public async findAllNoPagination(search?: string) {
    return await Repository.findAllNoPagination(search);
  }

  public async findOne(id: number) {
    const category = await Repository.findOne(id);

    if (!category) {
      throw new AppException(404, ErrorMessages.CATEGORY_NOT_FOUND);
    }
    return category;
  }

  public async createOne(data: CreateCategoryDto) {
    return await Repository.createOne(data);
  }

  public async updateOne(id: number, data: UpdateCategoryDto) {
    const category = await this.findOne(id);

    return await Repository.updateOne(category.id, data);
  }

  public async deleteOne(id: number) {
    const category = await this.findOne(id);

    return await Repository.deleteOne(category.id);
  }
}

export default new Service();
