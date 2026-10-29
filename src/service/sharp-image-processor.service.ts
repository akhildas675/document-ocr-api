import sharp from "sharp";
import type { IImageProcessor } from "../interface/image-processor.interface.js";


export class SharpImageProcessorService implements IImageProcessor{
  async preprocess(imageBuffer:Buffer):Promise<Buffer>{
    const image = sharp(imageBuffer);
    image.rotate();
    image.resize({
      width:2000,
      height:2000,
      fit:"inside",
      withoutEnlargement:true,
    })
    return await image.png().toBuffer()
  }
}