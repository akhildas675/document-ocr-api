import sharp from "sharp";

export class ImageValidationService{
  private async validateImage(imageBuffer:Buffer):Promise<void>{
  
      const metaData = await sharp(imageBuffer).metadata();

      console.log("Meta data...",metaData)

      const allowedFormats = [
        "jpeg",
        "png",
        "webp",

      ]

      if(!metaData.format || !allowedFormats.includes(metaData.format)){
        throw new Error("Unsupported image format")
      }
    
  }

  async imageValidation(frontImage:Buffer,backImage:Buffer):Promise<void>{
    await this.validateImage(frontImage)
    await this.validateImage(backImage)
  }
}