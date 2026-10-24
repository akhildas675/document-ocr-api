import express from "express";
import cors from "cors";
import ocrRoute from "./modules/routes/ocr.routes.js";
import { errorHandlerMiddleware } from "./middlewares/error-handler.middleware.js";


const app = express();


app.use(
  cors({
    origin:process.env.CLIENT || "http://localhost:5173"
  })
)
app.use(express.json({limit:"1mb"}))

app.get("/api/health",(_req,res)=>{
  res.status(200).json({
    success:true,
    message:"Document is running"
  })
})
app.use('/api/ocr',ocrRoute)

app.use(errorHandlerMiddleware)


export default app