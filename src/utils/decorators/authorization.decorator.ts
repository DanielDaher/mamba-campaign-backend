import { NextFunction, Request, Response } from 'express';
import { AccountRole, Permissions } from '@prisma/client';

import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';
import AdminPermissionsService from '@modules/auth/services/admin/admin.service';

export function Authorization(permission: Permissions) {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function(req: Request, res: Response, next: NextFunction) {
      // check if is an admin user.
      if (req.auth.role === AccountRole.admin) {

        // if check passes, then verify if admin has permission to access this module.
        const permissions = await AdminPermissionsService.findAllPermissions(req.auth.id);
        if (!permissions) throw new AppException(403, ErrorMessages.FORBIDDEN);

        const hasPermission = permissions.some(elem => elem.title === permission);
        if (!hasPermission) throw new AppException(403, ErrorMessages.FORBIDDEN);
      }

      await originalMethod.call(this, req, res, next);
    };

    return descriptor;
  };
}
