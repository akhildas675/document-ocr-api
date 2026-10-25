import { createWorker } from "tesseract.js";
import type { IOcrProvider } from "../modules/interface/ocr-provider.interface.js";
import type { IImageProcessor } from "../modules/interface/ocr-image.process.interface.js";

export class TesseractOcrProvider implements IOcrProvider{
  constructor(
    private readonly imageProcessor:IImageProcessor,
  ) {
    
  }
  async extractText(imageBuffer:Buffer):Promise<string>{

    const processedImage = await this.imageProcessor.preprocess(imageBuffer)

    
     const worker = await createWorker(['eng', 'hin']);


     try {

      const result = await worker.recognize(processedImage);
      return result.data.text.trim()
      
     } finally {
       await worker.terminate()
     }
  }
}