import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    departmentName: { type: String, required: true },
    localId: { type: String, required: true },
    userName: { type: String, required: true },
    emailId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roles: {
      type: [String], // Array of strings to allow multiple roles
      enum: [
        "Admin",
        "Principal",
        "Student",
        "Parent",
        "Teacher",
        "AcademicCoordinator",
        "Dummy"
      ], // Restrict valid roles
      default: ['Dummy'], // Default to "dummy"
    },
    approved: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

const userModel = mongoose.models.registeredUsers || mongoose.model('registeredUsers', userSchema);
export default userModel;
