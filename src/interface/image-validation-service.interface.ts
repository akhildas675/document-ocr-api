export interface IImageValidationService{
  imageValidation(frontImage:Buffer,backImage:Buffer):Promise<void>
}