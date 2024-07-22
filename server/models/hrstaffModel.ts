import mongoose, { Schema, Document } from "mongoose";

// Define roles enum
enum Roles {
  Staff = "staff",
  HRManager = "hrmanager",
  Admin = "admin",
  Committee = "committee",
}

// Define interface for HRStaff document
interface IHRStaff extends Document {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: Roles;
  phoneNumber: string;
  employmentDate: Date;
  photo: string;
  failedLoginAttempts?: Number;
  locked?: Boolean;
  lockedUntil?: Date;
}

// Define schema for HRStaff
const HRStaffSchema: Schema = new Schema({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: Object.values(Roles) },
  phoneNumber: { type: String },
  employmentDate: { type: String },
  photo: { type: String },
  failedLoginAttempts: { type: Number, default: 0 },
  locked: { type: Boolean, default: false },
  lockedUntil: { type: Date },
});

// Create and export HRStaff model
const HRStaff = mongoose.model<IHRStaff>("HRStaff", HRStaffSchema);
export default HRStaff;
