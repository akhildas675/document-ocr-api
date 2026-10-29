import express from "express";
import cors from "cors"
import { env } from "./config/env.js";
import { errorHandlingMiddleware } from "./middleware/error.handling.middleware.js";
import { BASE_PATH } from "./constants/routes.constants.js";
import aadhaarRoute from "./routes/aadhaar.route.js";


const app = express();


app.use(cors({
  origin:env.CLIENT_URL,
  credentials:true,
}));

app.use(express.json());

app.get("/api/health",(req,res)=>{
  res.status(200).json({
    success:true,
    message:"Document running successfully"
  })
})

app.use(BASE_PATH.BASE,aadhaarRoute)
app.use(errorHandlingMiddleware)

export default app