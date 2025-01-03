import mongoose from "mongoose";

const courseDataSchema = new mongoose.Schema({
  departmentId: { type: String, required: true },
  courseName: { type: String, required: true },
  courseId: { type: String, required: true, unique: true },
});

const courseModel =
  mongoose.models.course || mongoose.model("course", courseDataSchema);
export default courseModel;
