import mongoose from "mongoose";

const timeTableSchema= new mongoose.Schema({
    slotName:{type:String,required:true},
    classStartsFrom:{type:String,required:true},
    classEndsAt:{type:String,required:true},
});

const timeTableSlotsModel=mongoose.models.Time_Table_Slots|| mongoose.model("Time_Table_Slots",timeTableSchema);
export default timeTableSlotsModel;












 