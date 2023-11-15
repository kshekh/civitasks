import { Request } from 'express';
import multer from 'multer';
import { ValidationError } from '@middlewares/error-handler';

export const projectImageHandler = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 3 * 1024 * 1024 // 3MB limit
  },
  fileFilter: function (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) {
    if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
      cb(new ValidationError('Only .png, .jpg and .jpeg format allowed!'));
    }
    cb(null, true);
  },
});
