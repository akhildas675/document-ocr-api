
import type {
  FrontImageDetailsDto,
  BackImageDetailsDto,
} from "../dto/aadhaar-result.dto.js";

export class AadhaarExtractionService implements AadhaarExtractionService {
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

  private normalizeText(rawText: string): string {
    return rawText
      .replace(/\r/g, "")
      .replace(/[ \t]+/g, " ")
      .trim();
  }

  private extractName(rawText: string): string | null {
    const text = this.normalizeText(rawText);
    const lines = text
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const labelledMatch = text.match(
      /(?:^|\n)\s*Name\s*[:\-]?\s*([A-Za-z][A-Za-z .'-]{1,79})/im
    );

    if (labelledMatch?.[1]) {
      return labelledMatch[1].trim();
    }

    // Try lines before a labelled DOB.
    const dobIndex = lines.findIndex((line) =>
      /\b(?:DOB|Date\s+of\s+Birth)\b/i.test(line)
    );

    if (dobIndex >= 0) {
      for (
        let i = dobIndex - 1;
        i >= Math.max(0, dobIndex - 3);
        i--
      ) {
        const line = lines[i];

        if (!line) continue;

        const candidate = line
          .replace(/^[^A-Za-z]+/, "")
          .replace(/[^A-Za-z .'-]/g, "")
          .trim();

        if (
          candidate.length >= 3 &&
          candidate.length <= 80 &&
          /[A-Za-z]/.test(candidate) &&
          !/\b(?:government|india|authority|unique identification)\b/i.test(
            candidate
          )
        ) {
          return candidate;
        }
      }
    }

    return null;
  }

  private extractDateOfBirth(rawText: string): string | null {
    const text = this.normalizeText(rawText);

    const labelledMatch = text.match(
      /(?:DOB|Date\s+of\s+Birth)\s*[:\-]?\s*(\d{2}[/. -]\d{2}[/. -]\d{4}|\d{4}[/. -]\d{2}[/. -]\d{2})/i
    );

    if (labelledMatch?.[1]) {
      return labelledMatch[1];
    }

    const dateMatch = text.match(
      /\b(\d{2}[/-]\d{2}[/-]\d{4}|\d{4}-\d{2}-\d{2})\b/
    );

    return dateMatch?.[1] ?? null;
  }

  private extractGender(rawText: string): string | null {
    const match = this.normalizeText(rawText).match(
      /\b(MALE|FEMALE|TRANSGENDER)\b/i
    );

    const value = match?.[1];

    if (!value) return null;

    const gender = value.toLowerCase();

    return gender.charAt(0).toUpperCase() + gender.slice(1);
  }

  private extractAadhaarNumber(rawText: string): string | null {
    const text = rawText.replace(/\r/g, "");


    const groupedMatches = [
      ...text.matchAll(
        /(?:^|[^\d])(\d{4}(?:[ \t\n-]+\d{4}){2})(?!\d)/gm
      ),
    ];

    for (const match of groupedMatches) {
      const candidate = match[1];

      if (!candidate) continue;

      const digits = candidate.replace(/\D/g, "");

      if (digits.length === 12) {
        return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
      }
    }

    const continuousMatch = text.match(
      /(?:^|\D)(\d{12})(?!\d)/
    );

    const digits = continuousMatch?.[1];

    if (digits) {
      return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
    }

    return null;
  }

  private extractAddress(rawText: string): string | null {
    const text = this.normalizeText(rawText);

    const match = text.match(
      /Address\s*[:\-]?\s*([\s\S]*?)(?=\b(?:PIN\s*Code|Postal\s*Code|VID|Help)\b|www\.|$)/i
    );

    if (!match?.[1]) return null;

    let address = match[1].replace(/\s+/g, " ").trim();

    address = address
      .replace(/,?\s*\b[1-9]\d{5}\s*$/, "")
      .trim();

    return address.length >= 5 ? address : null;
  }

  private extractPinCode(rawText: string): string | null {
    const text = this.normalizeText(rawText);

    const labelledMatch = text.match(
      /\b(?:PIN(?:\s*Code)?|Postal\s*Code)\s*[:\-]?\s*([1-9]\d{5})\b/i
    );

    if (labelledMatch?.[1]) {
      return labelledMatch[1];
    }

  
    const matches = [
      ...text.matchAll(
        /(?:^|\D)([1-9]\d{5})(?=\s*(?:\n|$|[^\d]))/gm
      ),
    ];

    const lastMatch = matches[matches.length - 1];

    return lastMatch?.[1] ?? null;
  }
}
