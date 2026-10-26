
import {
  createWorker,
  PSM,
  type Worker,
} from "tesseract.js";

import type { IOcrProvider } from "../modules/interface/ocr-provider.interface.js";
import type { IImageProcessor } from "../modules/interface/ocr-image.process.interface.js";

export class TesseractOcrProvider implements IOcrProvider {
  private workerPromise: Promise<Worker> | null = null;

  constructor(
    private readonly imageProcessor: IImageProcessor
  ) {}

  private async getWorker(): Promise<Worker> {
    if (!this.workerPromise) {
      this.workerPromise = createWorker(
        ["eng", "hin"],
        undefined,
        {
          langPath: process.cwd(),
          gzip: false,
        }
      ).catch((error) => {
        this.workerPromise = null;
        throw error;
      });
    }

    return this.workerPromise;
  }

  async extractText(imageBuffer: Buffer): Promise<string> {
    if (!imageBuffer?.length) {
      throw new Error("The uploaded image is empty.");
    }

    const processedImage =
      await this.imageProcessor.preprocess(imageBuffer);

    const worker = await this.getWorker();

    await worker.setParameters({
      tessedit_pageseg_mode: PSM.AUTO,
      preserve_interword_spaces: "1",
    });

    const result = await worker.recognize(processedImage);

    return result.data.text
      .replace(/\r/g, "")
      .replace(/[ \t]+/g, " ")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  }
}
