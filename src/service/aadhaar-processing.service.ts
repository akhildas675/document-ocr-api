
import type { AadhaarResultDto } from "../dto/aadhaar-result.dto.js";
import { ImageValidationService } from "./image-validation.service.js";
import { SharpImageProcessorService } from "./sharp-image-processor.service.js";
import { TesseractOcrProvider } from "./tesseract-ocr.provider.js";
import { AadhaarExtractionService } from "./aadhaar-extraction.service.js";
import { AadhaarValidationService } from "./aadhaar-validation.service.js";

export class AadhaarProcessingService {
  constructor(
    private readonly imageValidation = new ImageValidationService(),
    private readonly imageProcessor = new SharpImageProcessorService(),
    private readonly ocrProvider = new TesseractOcrProvider(),
    private readonly extractionService = new AadhaarExtractionService(),
    private readonly validationService = new AadhaarValidationService()
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

   
    const validation = {
      name: this.validationService.validateName(
        frontDetails.name
      ),
      dateOfBirth: this.validationService.validateDateOfBirth(
        frontDetails.dateOfBirth
      ),
      gender: this.validationService.validateGender(
        frontDetails.gender
      ),
      aadhaarNumber: this.validationService.validateAadhaarNumber(
        frontDetails.aadhaarNumber
      ),
      address: this.validationService.validateAddress(
        backDetails.address
      ),
      pinCode: this.validationService.validatePinCode(
        backDetails.pinCode
      ),
    };

   
    return {
      frontImage: frontDetails,
      backImage: backDetails,
      validation,
    } as AadhaarResultDto;
  }
}
