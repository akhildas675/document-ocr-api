import type { IOcrProvider } from "../interface/ocr-provider.interface.js";
import type { IOcrServices } from "../interface/ocr-service.interface.js";

export class OcrServices implements IOcrServices {
  constructor(
    private readonly ocrProvider: IOcrProvider
  ) { }

  async extractDocumentText(
    frontImage: Buffer,
    backImage?: Buffer,
  ): Promise<{ frontText: string, backText: string | null }> {

    const frontTextPromise = this.ocrProvider.extractText(frontImage);
    const backTextPromise = backImage
      ? this.ocrProvider.extractText(backImage)
      : Promise.resolve(null);
    const [frontText, backText] = await Promise.all([
      frontTextPromise,
      backTextPromise,
    ]);
    return {
      frontText,
      backText,
    }

  }
}