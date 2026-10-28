
import sharp from "sharp";

import type { IImageProcessor } from "../interface/ocr-image.process.interface.js";

export class ImagePreprocessor implements IImageProcessor {
  async preprocess(imageBuffer: Buffer): Promise<Buffer> {
    if (!imageBuffer?.length) {
      throw new Error("Cannot preprocess an empty image.");
    }

    return sharp(imageBuffer, {
      failOn: "error",
    })
      .rotate()
      .resize({
        width: 2400,
        height: 2400,
        fit: "inside",
        withoutEnlargement: false,
      })
      .grayscale()
      .normalize()
      .sharpen()
      .png()
      .toBuffer();
  }
}
