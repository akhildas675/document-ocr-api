  import type { IOcrProvider } from "../interface/ocr-provider.interface.js";
  import type { IOcrServices } from "../interface/ocr-service.interface.js";

  export class OcrServices implements IOcrServices{
    constructor(
      private readonly ocrProvider:IOcrProvider
    ){}

    async extractDocumentText(
      frontImage:Buffer,
      backImage:Buffer,
    ):Promise<{frontText:string,backText:string}>{

      const [frontText,backText]=await Promise.all([
        this.ocrProvider.extractText(frontImage),
        this.ocrProvider.extractText(backImage)
      ])

      return {
        frontText,
        backText,
      }

    }
  }