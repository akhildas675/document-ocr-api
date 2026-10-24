import type { ErrorRequestHandler } from "express";
import multer from "multer";

export const errorHandlerMiddleware :ErrorRequestHandler=(error,_req,res,_next)=>{

  if(error instanceof multer.MulterError){
    const isTooLarge = error.code === "LIMIT_FILE_SIZE";

    res.status(isTooLarge ? 413: 400).json({
      success:false,
      message:isTooLarge ? "Each image must be less than 5 MB" 
      : "Invalid file upload",
    });
    return
  }


  if(error instanceof Error && error.message ==="Unsupported image type"){

    res.status(401).json({
      success:false,
      message:"Only JPEG, PNG, and WebP images are supported"
    });

    return

  }

  console.error("Server error",error)

  if(error instanceof Error){
    res.status(500).json({
      success:false,
      message:"An unexpected server error"
    })
  }

}