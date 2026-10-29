import multer from "multer";
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 2,
    fields: 0,
    parts: 2,
  },
  fileFilter: (req, file, callback) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
   
      if (!allowedTypes.includes(file.mimetype)) {
        callback(new Error("Only JPEG, PNG, and WebP images are allowed"));
        return;
      }
      callback(null,true)
  
  },
});


export const uploadAadhaarImages = upload.fields([
  {name:"frontImage",maxCount:1},
  {name:"backImage",maxCount:2}
])