import { Router } from "express";
import { ROUTE_PATH } from "../constants/routes.constants.js";

import { uploadAadhaarImages } from "../middleware/upload.middleware.js";
import { aadhaarProcessingService } from "../container/aadhaar.container.js";
import { AadhaarController } from "../controllers/aadhaar.controller.js";


const aadhaarRoute = Router();

const aadhaarController = new AadhaarController(aadhaarProcessingService)


aadhaarRoute.post(ROUTE_PATH.PARSE_IMAGE,uploadAadhaarImages,aadhaarController.uploadAadhaar)

export default aadhaarRoute