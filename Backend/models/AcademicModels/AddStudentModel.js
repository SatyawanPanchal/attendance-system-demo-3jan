import mongoose from "mongoose";

const addStudentSchema= new mongoose.Schema({
    departmentName:{type:String,required:true},
    courseName:{type:String,required:true},
    semesterName:{type:String,required:true},
    sectionName:{type:String,required:true},
    studentName:{type:String,required:true},
    fatherName:{type:String,required:true},
    rollNumber:{type:String,required:true},
    whatsAppNumber:{type:String,required:true}
});

const studentModel= mongoose.models.student || new mongoose.model('student',addStudentSchema);
export default studentModel;