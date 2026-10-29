
import sharp from "sharp";
import type { IImageProcessor } from "../interface/image-processor.interface.js";

export class SharpImageProcessorService implements IImageProcessor {
  async preprocess(imageBuffer: Buffer): Promise<Buffer> {
    return sharp(imageBuffer)
      .rotate()
      .flatten({ background: "#ffffff" })
      .resize({
        width: 2000,
        height: 2000,
        fit: "inside",
        withoutEnlargement: true,
      })
      .normalize()
      .sharpen()
      .png()
      .toBuffer();
  }
}
