export interface IImageProcessor{
  preprocess(imageBuffer:Buffer):Promise<Buffer>
}