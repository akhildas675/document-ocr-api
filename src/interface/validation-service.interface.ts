export interface IImageValidation{
  imageValidation(frontImage:Buffer,backImage:Buffer):Promise<void>
}