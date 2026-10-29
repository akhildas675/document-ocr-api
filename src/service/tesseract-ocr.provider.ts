import { createWorker } from "tesseract.js";
import type { IOcrProvider } from "../interface/ocr-provider.interface.js";

export class TesseractOcrProvider implements IOcrProvider{
  async extractText(imageBuffer: Buffer): Promise<string> {
    const worker = await createWorker("eng");

    try {
      
      const result = await worker.recognize(imageBuffer);
      return result.data.text;

    } finally {
      await worker.terminate();
    }
  }
}