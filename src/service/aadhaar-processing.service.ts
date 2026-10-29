
import type { AadhaarResultDto } from "../dto/aadhaar-result.dto.js";
import { ImageValidationService } from "./image-validation.service.js";
import { SharpImageProcessorService } from "./sharp-image-processor.service.js";
import { TesseractOcrProvider } from "./tesseract-ocr.provider.js";
import { AadhaarExtractionService } from "./aadhaar-extraction.service.js";

export class AadhaarProcessingService {
  constructor(
    private readonly imageValidation = new ImageValidationService(),
    private readonly imageProcessor = new SharpImageProcessorService(),
    private readonly ocrProvider = new TesseractOcrProvider(),
    private readonly extractionService = new AadhaarExtractionService()
  ) {}

  async processAadhaar(
    frontImage: Buffer,
    backImage: Buffer
  ): Promise<AadhaarResultDto> {
    
    await this.imageValidation.imageValidation(
      frontImage,
      backImage
    );

   
    const processedFrontImage =
      await this.imageProcessor.preprocess(frontImage);

    const processedBackImage =
      await this.imageProcessor.preprocess(backImage);

  
    const frontText =
      await this.ocrProvider.extractText(processedFrontImage);

    const backText =
      await this.ocrProvider.extractText(processedBackImage);

   
    const frontDetails =
      this.extractionService.extractFrontDetails(frontText);

    const backDetails =
      this.extractionService.extractBackDetails(backText);

  
    return {
      frontImage: frontDetails,
      backImage: backDetails,
    };
  }
}
