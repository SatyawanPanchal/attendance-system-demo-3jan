import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const connectDB =async()=>{
   await mongoose
   .connect(process.env.DB_URL)
   .then
   (()=>{
    console.log('database connected with attendanceDatabase');
    
   })
}