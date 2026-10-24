import sharp from "sharp";
import type { IImageProcessor } from "../modules/interface/ocr-image.process.interface.js";

export class ImagePreprocessor implements IImageProcessor {
  async preprocess(imageBuffer: Buffer): Promise<Buffer> {
    return sharp(imageBuffer)
      .rotate()
      .resize({
        width: 2000,
        height: 2000,
        fit: "inside",
        withoutEnlargement: true,
      })
      .greyscale()
      .normalize()
      .png()
      .toBuffer();
  }
}