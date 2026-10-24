export interface IOcrServices{
  extractDocumentText(frontImage:Buffer,backImage:Buffer):Promise<{frontText:string,backText:string}>;
}