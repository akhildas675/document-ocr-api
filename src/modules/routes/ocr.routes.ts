import { Router } from "express";
import { OcrController } from "../controllers/ocr.controller.js";
import { uploadDocumentsImages } from "../../middlewares/upload.middleware.js";

const ocrRoute = Router();


const ocrController = new OcrController()


ocrRoute.post(
  '/parse',
  uploadDocumentsImages,ocrController.uploadOcrImages
)

export default ocrRoute