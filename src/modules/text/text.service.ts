import Repository from './text.repository';

import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';

import { TextType } from '@prisma/client';
import { UpdateTextDto } from './dtos/update-text.dto';

class Service {
  public async findOne(type: TextType) {
    const text = await Repository.findOne(type);

    if (!text) {
      throw new AppException(404, ErrorMessages.TEXT_NOT_FOUND);
    }
    return text;
  }

  public async updateOne(type: TextType, data: UpdateTextDto) {
    const text = await this.findOne(type);

    return await Repository.updateOne(text.id, data);
  }
}

export default new Service();
