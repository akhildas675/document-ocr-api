import { Router } from "express";
import { uploadDocumentsImages } from "../middlewares/upload.middleware.js";
import { ocrController } from "../container/ocr.container.js";


const ocrRoute = Router();



ocrRoute.post(
  '/parse',
  uploadDocumentsImages,ocrController.uploadOcrImages
)

export default ocrRout