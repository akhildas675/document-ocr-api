import type { Request, Response, NextFunction } from "express";
import type { UploadImages } from "../types/type.js";
import type { IOcrServices } from "../interface/ocr-service.interface.js";

export class OcrController {

  constructor(
    private _ocrService:IOcrServices
  ){}

  uploadOcrImages = async (req: Request, res: Response, next: NextFunction) => {
    try {

      const files = req.files as UploadImages | undefined;

      const frontImage = files?.frontImage?.[0]
      const backImage = files?.backImage?.[0]

      if(!frontImage || !backImage){
        res.status(400).json({
          success:false,
          message:"Both frontImage and backImage required"
        });
        return
      }

      const result = await this._ocrService.extractDocumentText(frontImage.buffer,backImage.buffer)

      res.status(200).json({
        success:true,
        message:"Text extracted successfully",

        data:{
          frontText:result.frontText,
          backText:result.backText,
        }
      })
      
    } catch (error) {
      next(error)
    }
  };
}
