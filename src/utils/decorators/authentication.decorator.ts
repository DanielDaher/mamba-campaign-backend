import { NextFunction, Request, Response } from 'express';
import { IPayloadDto } from '@modules/auth/dtos/payload.dto';

import Passport from '@libs/passport';
import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';

export function Authentication() {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function(req: Request, res: Response, next: NextFunction) {
      Passport.authenticate('jwt', { session: false, failWithError: true },
        (err: any, payload: IPayloadDto) => {
          if (err) throw new Error(err);
          if (!payload) throw new AppException(401, ErrorMessages.UNATHORIZED);

          req.auth = payload;
        },
      )(req, res, next);

      await originalMethod.call(this, req, res, next);
    };

    return descriptor;
  };
}
