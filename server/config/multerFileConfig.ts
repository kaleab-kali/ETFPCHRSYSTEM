import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

function checkFileType(file: Express.Multer.File, cb: multer.FileFilterCallback) {
 
  const filetypes = /jpeg|jpg|png|gif|pdf/;
 
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
 
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only images and PDFs are allowed'));
  }
}

const upload = multer({
  storage: storage,
  limits: { fileSize: 2000000 }, // file size 2MB max
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
}).single('file');

export default upload;
