import multer from "multer"

const allowedTypes = new Set([
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

const upload = multer({
  storage:multer.memoryStorage(),
  limits:{
    fileSize:5 * 1024 * 1024,
    files:2,
    fields:0,
    parts:2,
  },

  fileFilter:(_req,file,callback)=>{
    if(!allowedTypes.has(file.mimetype)){
      callback(new Error("Unsupported image type"))
      return;
    }

    callback(null,true)
  },

})

export const uploadDocumentsImages = upload.fields([
  {name:"frontImage",maxCount:1},
  {name:"backImage",maxCount:1}
]);