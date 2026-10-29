import type { BackImageDetailsDto, FrontImageDetailsDto } from "../dto/aadhaar-result.dto.js";

export interface IAadhaarExtractionService {
  extractFrontDetails(rawText: string): FrontImageDetailsDto;
  extractBackDetails(rawText: string): BackImageDetailsDto;
}