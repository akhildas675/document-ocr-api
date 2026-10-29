
import type { AadhaarResultDto } from "../dto/aadhaar-result.dto.js";
import type { IAadhaarExtractionService } from "../interface/aadhaar-extraction-service.interface.js";
import type { IAadhaarProcessingService } from "../interface/aadhaar-processing-service.interface.js";
import type { IAadhaarValidationService } from "../interface/aadhaar-validation-service.interface.js";
import type { IImageProcessor } from "../interface/image-processor.interface.js";
import type { IImageValidationService } from "../interface/image-validation-service.interface.js";
import type { IOcrProvider } from "../interface/ocr-provider.interface.js";


export class AadhaarProcessingService implements IAadhaarProcessingService {
  constructor(
    private readonly imageValidation: IImageValidationService,
    private readonly imageProcessor: IImageProcessor,
    private readonly ocrProvider: IOcrProvider,
    private readonly extractionService: IAadhaarExtractionService,
    private readonly validationService: IAadhaarValidationService
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
      name: this.validationService.validateName(frontDetails.name),
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
    };
  }
}
