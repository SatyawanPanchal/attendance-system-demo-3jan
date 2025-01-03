import mongoose from "mongoose";

const rollRangeSchema= new mongoose.Schema({
    departmentName:{type:String,required:true},
    courseName:{type:String,required:true},
    semesterName:{type:String,required:true},
    sectionName:{type:String,required:true},
    rollStartsFrom:{type:Number,required:true},
    rollEndsWith:{type:Number,required:true},
    extraRolls:{type:String },
     
});

const rollRangeModel=mongoose.models.roll_Number_Ranges || mongoose.model("roll_Number_Ranges",rollRangeSchema);
export default rollRangeModel;