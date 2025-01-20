import mongoose from "mongoose";

const affixTeacherAndSubjectSchema = new mongoose.Schema({
  departmentName: { type: String, required: true },
  courseName: { type: String, required: true },
  semesterName: { type: String, required: true },
  sectionName: { type: String, required: true },
  teacherName: { type: String, required: true },
  teacherLocalId: { type: String, required: true },
  subjectName: { type: String, required: true },
});

const affixTeacherAndSubjectModel =
  mongoose.models.TeacherAndSubjects ||
  mongoose.model("TeacherAndSubjects", affixTeacherAndSubjectSchema);
export default affixTeacherAndSubjectModel;
