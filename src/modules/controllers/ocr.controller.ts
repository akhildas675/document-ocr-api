import type { Request, Response, NextFunction } from "express";
import type { UploadImages } from "../types/type.js";

export class OcrController {

  uploadOcrImages = (req: Request, res: Response, next: NextFunction) => {
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

      res.status(200).json({
        success:true,
        message:"Both images are successfully uploaded",
        data:{
          frontImage:{
            size:frontImage?.size,
            mimetype:frontImage?.mimetype
          },
          backImage:{
            size:backImage?.size,
            mimetype:backImage?.mimetype
          }
        }
      });
      
    } catch (error) {
      next(error)
    }
  };
}
