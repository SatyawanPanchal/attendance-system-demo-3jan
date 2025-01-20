import mongoose from "mongoose";

const otpSchema= new mongoose.Schema({
    otp:{type:String,required:true},
    email:{type:String,required:true,unique:true}
});

const otpModel=mongoose.models.otpDetails || mongoose.model("otpDetails",otpSchema);
export default otpModel;