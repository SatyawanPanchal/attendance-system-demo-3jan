import mongoose from "mongoose";


const semAndSectionSchema= new mongoose.Schema({
    departmentId:{type: String, required: true},
    courseId:{type: String, required: true},
    semesterName:{type: String, required: true},
    sectionName:{type: String, required: true},
    sectionId:{type: String, required: true,unique:true},
    
});

const sectionModel= mongoose.models.section|| mongoose.model("section",semAndSectionSchema);
export default sectionModel;







 