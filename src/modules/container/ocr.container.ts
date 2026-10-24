import { ImagePreprocessor } from "../../providers/image-preprocessor.js";
import { TesseractOcrProvider } from "../../providers/tesseract-ocr.provider.js";
import { OcrController } from "../controllers/ocr.controller.js";
import { OcrServices } from "../services/ocr.services.js";


const imageProcessor = new ImagePreprocessor()
const ocrProvider = new TesseractOcrProvider(imageProcessor)
const ocrService = new OcrServices(ocrProvider);

export const ocrController = new OcrController(ocrService)