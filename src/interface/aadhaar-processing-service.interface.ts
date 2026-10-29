import type { AadhaarResultDto } from
  "../dto/aadhaar-result.dto.js";

export interface IAadhaarProcessingService {
  processAadhaar(
    frontImage: Buffer,
    backImage: Buffer
  ): Promise<AadhaarResultDto>;
}