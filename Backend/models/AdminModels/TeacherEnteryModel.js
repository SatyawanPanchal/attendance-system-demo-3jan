import mongoose from "mongoose";

const teacherDataSchema = new mongoose.Schema({
  departmentId: { type: String, required: true },
  courseId: { type: String, required: true },
  teacherName: { type: String, required: true },
  teachersLocalId:{type:String,required:true},
  teacherId: { type: String, required: true, unique: true },
});

const teacherModel =
  mongoose.models.teacher || mongoose.model("teacher", teacherDataSchema);
export default teacherModel;


// there is some error in addTeacher at backend ... 
