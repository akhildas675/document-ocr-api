import { Router } from "express";
import { ROUTE_PATH } from "../constants/routes.constants.js";
import { AadhaarController } from "../contollers/aadhaar.controller.js";
import { uploadAadhaarImages } from "../middleware/upload.middleware.js";


const aadhaarRoute = Router();

const aadhaarController = new AadhaarController()


aadhaarRoute.post(ROUTE_PATH.PARSE_IMAGE,uploadAadhaarImages,aadhaarController.uploadAadhaar)

export default aadhaarRoute