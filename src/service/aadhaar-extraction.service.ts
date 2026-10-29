
import type {
  FrontImageDetailsDto,
  BackImageDetailsDto,
} from "../dto/aadhaar-result.dto.js";

export class AadhaarExtractionService {
  extractFrontDetails(rawText: string): FrontImageDetailsDto {
    return {
      name: this.extractName(rawText),
      dateOfBirth: this.extractDateOfBirth(rawText),
      gender: this.extractGender(rawText),
      aadhaarNumber: this.extractAadhaarNumber(rawText),
    };
  }

  extractBackDetails(rawText: string): BackImageDetailsDto {
    return {
      address: this.extractAddress(rawText),
      pinCode: this.extractPinCode(rawText),
    };
  }

  private extractName(rawText: string): string | null {
    const match = rawText.match(
      /(?:^|\n)\s*(?:name\s*[:\-]\s*)([a-zA-Z ]{3,80})/i
    );

    return match?.[1]?.trim() || null;
  }

  private extractDateOfBirth(rawText: string): string | null {
    const match = rawText.match(
      /(?:DOB|Date of Birth)\s*[:\-]?\s*(\d{2}[\/.-]\d{2}[\/.-]\d{4}|\d{4}[\/.-]\d{2}[\/.-]\d{2})/i
    );

    return match?.[1] || null;
  }

  private extractGender(rawText: string): string | null {
    const match = rawText.match(/\b(MALE|FEMALE|TRANSGENDER)\b/i);

    if (!match?.[1]) {
      return null;
    }

    return match[1].toLowerCase().replace(/^./, (char) =>
      char.toUpperCase()
    );
  }

  private extractAadhaarNumber(rawText: string): string | null {
    const match = rawText.match(/\b\d{4}[ -]\d{4}[ -]\d{4}\b/);

    return match?.[0]?.replace(/[ -]/g, " ") || null;
  }

  private extractAddress(rawText: string): string | null {
    const match = rawText.match(
      /Address\s*[:\-]?\s*([\s\S]*?)(?=\b(?:PIN\s*Code|Postal Code|VID|Help|www\.)\b|$)/i
    );

    return match?.[1]?.replace(/\s+/g, " ").trim() || null;
  }

  private extractPinCode(rawText: string): string | null {
    const match = rawText.match(
      /\b(?:PIN(?:\s*Code)?|Postal Code)\s*[:\-]?\s*(\d{6})\b/i
    );

    return match?.[1] || null;
  }
}
