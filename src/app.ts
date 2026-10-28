import express from "express";
import cors from "cors"
import { env } from "./config/env.js";


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

export default app