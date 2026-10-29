import type { NextFunction, Request, Response } from "express";
import type { UploadImages } from "../interface/aadhaar.interface.js";
import { ImageValidationService } from "../service/image-validation.service.js";

export class AadhaarController {
  constructor(
    private _imageValidation = new ImageValidationService()
  ){

  }
  uploadAadhaar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const files = req.files as UploadImages | undefined;

      console.log("req.files",req.files)

      const frontImage = files?.frontImage;
      const backImage = files?.backImage;

    

    

      if (!frontImage || !backImage) {
        res.status(400).json({
          success: false,
          message: "Both front and back Aadhaar images are required",
        });

        return;
      }

        await this._imageValidation.imageValidation(frontImage.buffer,backImage.buffer)

      res.status(200).json({
        success: true,
        message: "Both Image uploaded successfully",

        data: {
          frontImage: {
            originalName: frontImage.originalname,
            size: frontImage.size,
            mimeType: frontImage.mimetype,
          },
          backImage: {
            originalName: backImage.originalname,
            size: backImage,
            mimeType: backImage.mimetype,
          },
        },
      });
    } catch (error) {
      console.error(error);
      next(error)
    }
  };
}
