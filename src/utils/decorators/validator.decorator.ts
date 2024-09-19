import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { RequestPropertyType } from '@customTypes/request.type';

import ValidateSchemaHelper from '@helpers/validate-schema.helper';

export function ValidateSchema(property: RequestPropertyType, schema: z.ZodTypeAny) {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function(req: Request, res: Response, next: NextFunction) {
      req[property] = ValidateSchemaHelper.validate(schema, req[property]);

      await originalMethod.call(this, req, res, next);
    };

    return descriptor;
  };
}
