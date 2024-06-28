import mongoose, { Schema, Document } from "mongoose";

// Define interface for Attendance document
interface IAttendance extends Document {
  employeeId: string;
  date: Date;
  status: "on time" | "late" | "absent" | "permission";
  recordedTime: Date;
  checkOutTime?: Date;
  evidence?: string; // URL or path to the evidence document
  reviewStatus?: "pending" | "approved" | "rejected";
}

// Define attendance schema
const attendanceSchema: Schema = new mongoose.Schema({
  employeeId: { type: String, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ["late", "on time", "absent", "permission"], required: true },
  recordedTime: { type: Date, default:  null },
  checkOutTime: { type: Date },
  evidence: { type: String },
  reviewStatus: { type: String },
});

// Define attendance model
const Attendance = mongoose.model<IAttendance>("Attendance", attendanceSchema);

// Ensure unique attendance records per employee per day
attendanceSchema.index({ employeeId: 1, date: 1 }, { unique: true });

export default Attendance;
