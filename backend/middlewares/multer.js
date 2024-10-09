import multer from 'multer';

const storage = multer.memoryStorage();
export const singleUpload = multer({storage}).single('file');
//the filename provide must be same as that of type name for file in form
//attach this middleware wherever there is single image upload funcitonality