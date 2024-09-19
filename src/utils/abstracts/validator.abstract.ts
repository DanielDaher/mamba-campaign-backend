import { NextFunction, Request, RequestHandler } from 'express';
import { RequestPropertyType } from '@customTypes/request.type';
import { z } from 'zod';

import AppException from '@errors/app-exception';
import { RequestPath } from '@dtos/request-path.dto';
import { RequestQuery } from '@dtos/request-query.dto';
import { UpdateStatus } from '@dtos/update-status.dto';

abstract class BaseValidator {
  constructor(
    protected readonly pathSchema = RequestPath,
    protected readonly querySchema = RequestQuery,
    protected readonly updateStatusSchema = UpdateStatus,
  ) {}

  private zodValidation<T extends z.ZodTypeAny>(schema: T, value: any) {
    return schema.parse(value);
  }

  protected validateSchema(req: Request, next: NextFunction, property: RequestPropertyType, schema: z.ZodTypeAny) {
    try {
      req[property] = this.zodValidation(schema, req[property]);
      next();

    } catch (err: any) {
      next(new AppException(400, err.issues));

    }
  }

  public pathParams: RequestHandler = (req, res, next) => {
    this.validateSchema(req, next, 'params', this.pathSchema);
  };

  public queryParams: RequestHandler = (req, res, next) => {
    this.validateSchema(req, next, 'query', this.querySchema);
  };

  public updateStatus: RequestHandler = (req, res, next) => {
    this.validateSchema(req, next, 'body', this.updateStatusSchema);
  };
}

export default BaseValidator;
