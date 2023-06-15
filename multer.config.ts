import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

export const multerConfig = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const filename = uuidv4();
      cb(null, filename);
    },
  }),
};
