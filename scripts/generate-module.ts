import * as fs from 'fs/promises';
import * as path from 'path';

const createModule = async(moduleName: string) => {
  const modulePath = path.join(__dirname, '..', 'src', 'modules', moduleName);
  const dtoPath = path.join(modulePath, 'dtos');

  // Verifica se o módulo já existe.
  try {
    await fs.access(modulePath);
    return console.error(`Erro! O módulo "${moduleName}" já existe.`);

  } catch (error: any) {
    // O módulo não existe, continue com a criação.
  }

  // Cria a pasta do módulo.
  await fs.mkdir(modulePath);

  // Cria a pasta "dtos".
  await fs.mkdir(dtoPath);

  // Cria os arquivos DTO.
  await fs.writeFile(
    path.join(dtoPath, `create-${moduleName}.dto.ts`),
    generateCreateDtoContent(moduleName),
  );
  await fs.writeFile(
    path.join(dtoPath, `update-${moduleName}.dto.ts`),
    generateUpdateDtoContent(moduleName),
  );
  await fs.writeFile(
    path.join(dtoPath, `${moduleName}.dto.ts`),
    generateDtoContent(moduleName),
  );

  // Cria os arquivos básicos.
  await fs.writeFile(
    path.join(modulePath, `${moduleName}.controller.ts`),
    generateControllerContent(moduleName),
  );
  await fs.writeFile(
    path.join(modulePath, `${moduleName}.repository.ts`),
    generateRepositoryContent(moduleName),
  );
  await fs.writeFile(
    path.join(modulePath, `${moduleName}.routes.ts`),
    generateRouteContent(moduleName),
  );
  await fs.writeFile(
    path.join(modulePath, `${moduleName}.service.ts`),
    generateServiceContent(moduleName),
  );
  await fs.writeFile(
    path.join(modulePath, `${moduleName}.validator.ts`),
    generateValidatorContent(moduleName),
  );

  console.log(`Módulo "${moduleName}" criado com sucesso.`);
};

function generateControllerContent(module: string) {
  return `
import Service from './${module}.service';
import { TryCatch } from '@decorators/try-catch.decorator';
import { Request, Response } from 'express';
import { RequestQueryDto } from '@dtos/request-query.dto';

class Controller {
  @TryCatch()
  public async findAll(req: Request, res: Response) {
    const { size, page, search } = req.query as RequestQueryDto;

    const result = (size && page)
      ? await Service.findAll(size, page, search)
      : await Service.findAllNoPagination(search);
    res.status(200).json(result);
  }

  @TryCatch()
  public async findOne(req: Request, res: Response) {
    const result = await Service.findOne(+req.params.id);
    res.status(200).json(result);
  }

  @TryCatch()
  public async createOne(req: Request, res: Response) {
    const result = await Service.createOne(req.body);
    res.status(201).json(result);
  }

  @TryCatch()
  public async updateOne(req: Request, res: Response) {
    const result = await Service.updateOne(+req.params.id, req.body);
    res.status(200).json(result);
  }

  @TryCatch()
  public async deleteOne(req: Request, res: Response) {
    const result = await Service.deleteOne(+req.params.id);
    res.status(200).json(result);
  }
}

export default new Controller();
`;
}

function generateRepositoryContent(module: string) {
  return `
import DataSource from '@database/data-source';

import { Prisma } from '@prisma/client';
import { ${titleCase(module)}Dto } from './dtos/${module}.dto';

class Repository {
  constructor(private readonly repository = DataSource.${module}) {}

  public findAll(size: number, page: number, search?: string) {
    const where: Prisma.${titleCase(module)}WhereInput = {};

    return DataSource.$transaction([
      this.repository.findMany({
        where,
        take: size,
        skip: ((page - 1) * size),
        select: ${titleCase(module)}Dto,
      }),
      this.repository.count({ where }),
    ]);
  }

  public findAllNoPagination(search?: string) {
    const where: Prisma.${titleCase(module)}WhereInput = {};

    return this.repository.findMany({
      where,
      select: ${titleCase(module)}Dto,
    });
  }

  public findOne(id: number) {
    return this.repository.findUnique({
      where: { id },
      select: ${titleCase(module)}Dto,
    });
  }

  public createOne(data: Prisma.${titleCase(module)}CreateInput) {
    return this.repository.create({
      data,
      select: ${titleCase(module)}Dto,
    });
  }

  public updateOne(id: number, data: Prisma.${titleCase(module)}UpdateInput) {
    return this.repository.update({
      where: { id },
      data,
      select: ${titleCase(module)}Dto,
    });
  }

  public deleteOne(id: number) {
    return this.repository.delete({
      where: { id },
      select: ${titleCase(module)}Dto,
    });
  }
}

export default new Repository();
`;
}

function generateRouteContent(module: string) {
  return `
import { Router } from 'express';

// import Auth from '@middlewares/auth.middleware';
import Controller from './${module}.controller';
import Validator from './${module}.validator';

const router = Router();

router
.route('/')
.get(
  Validator.queryParams,
  Controller.findAll,
)
.post(
  Validator.createOne,
  Controller.createOne,
);

router
.route('/:id')
.all(
  Validator.pathParams,
)
.get(
  Controller.findOne,
)
.put(
  Validator.updateOne,
  Controller.updateOne,
)
.delete(
  Controller.deleteOne,
);

export default router;
`;
}

function generateServiceContent(module: string) {
  return `
import Repository from './${module}.repository';

import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';
import PaginationHelper from '@helpers/pagination.helper';

import { Create${titleCase(module)}Dto } from './dtos/create-${module}.dto';
import { Update${titleCase(module)}Dto } from './dtos/update-${module}.dto';

class Service {
  public async findAll(size: number, page: number, search?: string) {
    const ${module}s = await Repository.findAll(size, page, search);

    return PaginationHelper.paginate(${module}s, size, page);
  }

  public async findAllNoPagination(search?: string) {
    return await Repository.findAllNoPagination(search);
  }

  public async findOne(id: number) {
    const ${module} = await Repository.findOne(id);

    if (!${module}) {
      throw new AppException(404, ErrorMessages.${module.toUpperCase()}_NOT_FOUND);
    }
    return ${module};
  }

  public async createOne(data: Create${titleCase(module)}Dto) {
    return await Repository.createOne(data);
  }

  public async updateOne(id: number, data: Update${titleCase(module)}Dto) {
    const ${module} = await this.findOne(id);

    return await Repository.updateOne(${module}.id, data);
  }

  public async deleteOne(id: number) {
    const ${module} = await this.findOne(id);

    return await Repository.deleteOne(${module}.id);
  }
}

export default new Service();
`;
}

function generateValidatorContent(module: string) {
  return `
import BaseValidator from '@abstracts/validator.abstract';
import { RequestHandler } from 'express';
import { Create${titleCase(module)} } from './dtos/create-${module}.dto';
import { Update${titleCase(module)} } from './dtos/update-${module}.dto';

class Validator extends BaseValidator {
  public createOne: RequestHandler = (req, res, next) => {
    this.validateSchema(req, next, 'body', Create${titleCase(module)});
  };

  public updateOne: RequestHandler = (req, res, next) => {
    this.validateSchema(req, next, 'body', Update${titleCase(module)});
  };
}

export default new Validator();
`;
}

function generateCreateDtoContent(module: string) {
  return `
import { z } from 'zod';

export type Create${titleCase(module)}Dto = z.output<typeof Create${titleCase(module)}>;
export const Create${titleCase(module)} = z.object({});
`;
}

function generateUpdateDtoContent(module: string) {
  return `
import { z } from 'zod';

export type Update${titleCase(module)}Dto = z.output<typeof Update${titleCase(module)}>;
export const Update${titleCase(module)} = z.object({});
`;
}

function generateDtoContent(module: string) {
  return `
import { Prisma } from '@prisma/client';

export const ${titleCase(module)}Dto = Prisma.validator<Prisma.${titleCase(module)}Select>()({});
`;
}

function titleCase(text: string) {
  return text.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}


// --
const args = process.argv.slice(2);

if (args.length !== 1) {
  console.error('Uso: npx tsx scripts/generate-module.ts <nome-do-modulo>');
  process.exit(1);
}createModule(args[0]);
