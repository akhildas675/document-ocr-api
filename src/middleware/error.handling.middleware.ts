import type { ErrorRequestHandler } from "express";
import multer from "multer";

export const errorHandlingMiddleware : ErrorRequestHandler =
((error,req,res,next)=>{
  if(error instanceof multer.MulterError){
    res.status(400).json({
      success:false,
      message:error.message,
      code:error.code
    });
    return;
  }
  next(error)
})