
import { createWorker, PSM } from "tesseract.js";
import type { IOcrProvider } from "../interface/ocr-provider.interface.js";

export class TesseractOcrProvider implements IOcrProvider {
  async extractText(imageBuffer: Buffer): Promise<string> {
    const worker = await createWorker("eng");

    try {
      await worker.setParameters({
        tessedit_pageseg_mode: PSM.AUTO,
        preserve_interword_spaces: "1",
      });

      const result = await worker.recognize(imageBuffer);

      return result.data.text;
    } finally {
      await worker.terminate();
    }
  }
}
