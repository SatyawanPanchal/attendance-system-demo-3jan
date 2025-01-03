import mongoose from "mongoose";


const subjectDataSchema= new mongoose.Schema({
    departmentId:{type: String, required: true},
    courseId:{type: String, required: true},
    semesterName:{type: String, required: true},
    sectionId:{type: String, required: true},
    subjectName:{type: String, required: true},
    subjectId:{type: String, required: true,unique:true},

})

const subjectModel=mongoose.models.subject || mongoose.model("subject",subjectDataSchema);
export default subjectModel;