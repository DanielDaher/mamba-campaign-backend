import crypto from 'crypto';
import multer from 'multer';
// import multerS3 from 'multer-s3';

import { Request } from 'express';
// import { S3Client } from '@aws-sdk/client-s3';
import AppException from '@errors/app-exception';

const ALLOWED_MIMES = ['image/jpeg', 'image/png'];
const MAX_SIZE_TWO_MEGABYTES = 2 * 1024 * 1024;

const storageTypes = {
  local: multer.diskStorage({
    destination: process.env.STORAGE_LOCAL,
    filename: (req: Request, file: any, callback: any) => {
      const fileHash = crypto.randomBytes(16).toString('hex');
      file.key = `${fileHash}-${file.originalname}`;
      file.location = `${process.env.APP_URL}/files/${file.key}`;
      return callback(null, file.key, file.location);
    },
  }),
};

export default {
  dest: process.env.STORAGE_LOCAL as string,
  storage: storageTypes.local,
  limits: {
    fileSize: MAX_SIZE_TWO_MEGABYTES,
  },
  fileFilter: (req: Request, file: any, callback: any) => {
    if (ALLOWED_MIMES.includes(file.mimetype)) {
      return callback(null, true);
    }
    return callback(new AppException(415, 'Tipo de arquivo não suportado.'));
  },
};
