
import type { NextFunction, Request, Response } from "express";
import type { UploadImages } from "../interface/aadhaar.interface.js";
import type { IAadhaarProcessingService } from "../interface/aadhaar-processing-service.interface.js";

export class AadhaarController {
  constructor(
     private readonly _aadhaarProcessing: IAadhaarProcessingService
  ) {}

  uploadAadhaar = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const files = req.files as UploadImages | undefined;

      const frontImage = files?.frontImage?.[0];
      const backImage = files?.backImage?.[0];

     
      if (!frontImage || !backImage) {
        res.status(400).json({
          success: false,
          message: "Both front and back Aadhaar images are required",
        });
        return;
      }

      
      const result = await this._aadhaarProcessing.processAadhaar(
        frontImage.buffer,
        backImage.buffer
      );

    
      res.status(200).json({
        success: true,
        message: "Aadhaar information extracted successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
}
