import { ImageValidationService } from
  "../service/image-validation.service.js";
import { SharpImageProcessorService } from
  "../service/sharp-image-processor.service.js";
import { TesseractOcrProvider } from
  "../service/tesseract-ocr.provider.js";
import { AadhaarExtractionService } from
  "../service/aadhaar-extraction.service.js";
import { AadhaarValidationService } from
  "../service/aadhaar-validation.service.js";
import { AadhaarProcessingService } from
  "../service/aadhaar-processing.service.js";
import { AadhaarController } from "../controllers/aadhaar.controller.js";

export const aadhaarProcessingService =
  new AadhaarProcessingService(
    new ImageValidationService(),
    new SharpImageProcessorService(),
    new TesseractOcrProvider(),
    new AadhaarExtractionService(),
    new AadhaarValidationService()
  );
