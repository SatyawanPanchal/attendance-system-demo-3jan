import mongoose from "mongoose";

const deptDataSchema = new mongoose.Schema({
  departmentName: { type: String, required: true },
  departmentId: { type: String, required: true, unique: true },
  departmentDetails: { type: String },
});

const departmentModel =
  mongoose.model.department || mongoose.model("department", deptDataSchema);
export default departmentModel;
