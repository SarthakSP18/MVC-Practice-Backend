import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/mvcpractice").then(()=>console.log("DB Connected")
).catch((error=>console.log(`Error while connecting ${error}`)
))

app.use("/api/users",userRoute);

app.listen(5000,()=>{
    console.log("Server running");
    
})