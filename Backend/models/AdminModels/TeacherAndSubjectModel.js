import mongoose from "mongoose";

const teacherAndSubjectSchema = new mongoose.Schema({
  day: { type: String, required: true },
  departmentName: { type: String, required: true },
  courseName: { type: String, required: true },
  semesterName: { type: String, required: true },
  sectionName: { type: String, required: true },
  classTimingSlot: { type: String, required: true },
  subjectName: { type: String, required: true },
  teacherName: { type: String, required: true },
  teacherLocalId: { type: String, required: true },
});

const teacherAndSubjectModel =
  mongoose.models.Time_Table ||
  mongoose.model("Time_Table", teacherAndSubjectSchema);
export default teacherAndSubjectModel;
